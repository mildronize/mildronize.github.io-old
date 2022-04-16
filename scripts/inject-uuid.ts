// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
import dotenv from 'dotenv';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { promisify } from 'util';
import { createApi } from 'unsplash-js';
import nodeFetch from 'isomorphic-fetch';
import * as date from 'date-fns'
import * as _ from 'lodash'
import { getAllMarkdownPaths, retryNewUuid, stageChangeGit } from './utils';

dotenv.config();
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

/**
  Option:
  process.argv
     stage-changes

  default: do nothing
*/

const unsplashAccessKey = process.env.UNSPLASH_ACCESS_KEY;

const targetPath = "content/posts";
const defaultUnicode = 'utf8';
let isAddUnsplashCover = false;
let isStageChangeMode = false;
let unsplash;

const firstArg = process.argv[2];
if (firstArg === 'add-unsplash') {
  isAddUnsplashCover = true;
  isStageChangeMode = true;
} else if (firstArg === 'stage-changes') {
  isStageChangeMode = true;
}

if (isAddUnsplashCover) {
  unsplash = createApi({
    accessKey: unsplashAccessKey,
    fetch: nodeFetch,
  });
}

async function checkUnsplashAccessToken() {
  const result = await unsplash?.photos.getRandom({ count: 1 });
  if (result?.type === 'error') {
    throw Error(result.errors)
  }
}

if (!unsplashAccessKey && isAddUnsplashCover) {
  console.log(`Running inject-uuid without Add Unsplash`);
}

console.log(`Running inject-uuid [mode] isStageChangeMode: ${isStageChangeMode}`);
console.log(`Running inject-uuid [mode] isAddUnsplashCover: ${isAddUnsplashCover}`);

function randomRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

async function getRandomUnsplashImageId() {
  const randomResult = await unsplash.photos.getRandom({ count: 1 });
  return randomResult.response[0].id;
}

async function getUnsplashImageId(limit: number, queries: string[]) {
  const imageIds = [];
  if (queries.length === 0) return await getRandomUnsplashImageId();
  console.log(`Searching ${limit} photos with '${queries[0]}' keywords`);
  const result = await unsplash.search.getPhotos({
    query: queries[0],
    page: 1,
    perPage: limit,
    orientation: 'landscape',
  });

  // console.log(result);

  if (result.response?.results.length === 0) {
    // Remove first element
    return getUnsplashImageId(limit, queries.slice(1));
  }

  result.response.results.forEach(result => {
    imageIds.push(result.id)
  })

  return imageIds[randomRange(0, imageIds.length - 1)];
}

export const getUuidStore = async (markdownPaths: string[], targetPath: string) => {
  const uuids: Record<string, string> = {};
  const readFileWorkers: Promise<any>[] = [];
  for (const mdPath of markdownPaths) {
    const absoluteMarkdownPath = path.resolve(targetPath, mdPath);
    readFileWorkers.push(readFile(absoluteMarkdownPath, defaultUnicode));
  }

  const readFiles = await Promise.all(readFileWorkers);
  readFiles.forEach((readFile, index) => {
    const frontmatter = matter(readFile);
    if (!Object.prototype.hasOwnProperty.call(frontmatter, "data")) return;
    if (!Object.prototype.hasOwnProperty.call(frontmatter.data, "uuid")) return;
    if (Object.prototype.hasOwnProperty.call(uuids, frontmatter.data.uuid))
      throw new Error('The uuid is duplicating, please fix this issue before run this command again');
    uuids[frontmatter.data.uuid] = markdownPaths[index];
  });

  return {
    uuidStore: uuids,
    markdownFiles: readFiles
  };
}

function getParentDirectory(filePath: string): string {
  const split = filePath.split("/");
  if (split.length < 2) return '';
  return split[split.length - 2];
}

function getDateFromMarkdownFile(filePath: string): Date {
  // Import from gatsby-node.js
  // 2021-08-05-migrate-react-class-component-to-functional-component
  /*
  If structure markdown files as a directory
    ```
    ./2015-05-07-responsive-expanding-search-bar
      └── readme.md (any file, use info from parent)
    ```
  Use info from dir name not file name , extract date and filename

  Note: This allow only one markdown file per parent dir like /^(\d+-\d+-\d+)-([\w-]+)$/
  */
  const filenameRegex = /^(\d+-\d+-\d+)-([\w-]+)$/;
  // let tmp = filePath;
  const parentDirectory = getParentDirectory(filePath);
  const _split = filePath.replace('.md', '').split('/');
  let actualFilename = _split[_split.length - 1]

  if (filenameRegex.test(parentDirectory)) {
    actualFilename = parentDirectory;
  }
  const nodeDate = actualFilename.split('-').slice(0, 3).join('-');
  const postDate = new Date(nodeDate)
  if (!date.isValid(postDate)) {
    throw Error(`[Err] "${nodeDate}" is not date, please check ${filePath}`);
  }
  return postDate;
}

async function writeFrontmatter(markdownPath: string, frontmatter: matter.GrayMatterFile<any>, mode: string) {
  await writeFile(markdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
  if (isStageChangeMode) {
    // Auto stage change in git
    await stageChangeGit(markdownPath);
  }
  console.log(`[ADD ${mode}] of ${markdownPath}`);
}

async function main() {
  checkUnsplashAccessToken();
  console.time("inject-uuid");
  console.time("getAllMarkdownPaths");
  const markdownPaths = await getAllMarkdownPaths(targetPath);
  console.timeEnd("getAllMarkdownPaths");
  console.time("getUuidStore");
  const { uuidStore, markdownFiles } = await getUuidStore(markdownPaths, targetPath);
  console.timeEnd("getUuidStore");
  console.log(`Started running to inject uuid on Markdown ${markdownPaths.length} files`);

  console.time("addUuidToMarkdown");
  for (let index = 0; index < markdownFiles.length; index++) {
    const readFile = markdownFiles[index];
    const mdPath = markdownPaths[index];
    const markdownPath = path.join(targetPath, mdPath);
    // Get frontmatter
    const frontmatter = matter(readFile);
    let uuid = retryNewUuid(uuidStore);

    // Start Inject UUID
    if (!('uuid' in frontmatter.data)) {
      frontmatter.data.uuid = uuid;
      await writeFrontmatter(markdownPath, frontmatter, "UUID");
    } else {
      uuid = frontmatter.data.uuid;
    }

    // Start Inject Date
    try {
      const postDate = getDateFromMarkdownFile(mdPath);
      if (!('date' in frontmatter.data)) {
        frontmatter.data.date = date.format(postDate, "yyyy-MM-dd");
        await writeFrontmatter(markdownPath, frontmatter, "Date");
      }
    } catch (e) {
      console.warn(e.message);
    }

    // Start Inject slug
    const disableAutoSlug = 'disableAutoSlug' in frontmatter.data ? frontmatter.data.disableAutoSlug as boolean : false;
    if (typeof disableAutoSlug !== 'boolean') throw Error(`disableAutoSlug should be boolean`);
    const slug = `${_.kebabCase(frontmatter.data.title)}-${uuid}`;
    // if(slug.length > 255) throw Error(`Filename (slug) is too long, please rename title (${slug})`)
    if (!('slug' in frontmatter.data) && disableAutoSlug === false) {
      frontmatter.data.slug = slug;
      await writeFrontmatter(markdownPath, frontmatter, "slug");
    } else if(disableAutoSlug == true){
      console.log(`[SKIP] auto slug with "${mdPath}"`)
    }

    const shortUrl = `/s/${uuid}`;
    // Add Alias 
    if (!('aliases' in frontmatter.data)){
      frontmatter.data.aliases = [ shortUrl ];
      await writeFrontmatter(markdownPath, frontmatter, "aliases");
    } else {
      // TODO: Append Alias if exist
    }

    // Start Inject unsplashImgCoverId
    if (!('unsplashImgCoverId' in frontmatter.data) && isAddUnsplashCover && unsplashAccessKey) {
      const tags = Array.isArray(frontmatter.data.tags) ? frontmatter.data.tags : [];
      if (tags.length === 0) continue;
      try {
        frontmatter.data.unsplashImgCoverId = await getUnsplashImageId(3, tags);
      } catch (error) {
        console.error('Cannot get unsplash', error)
      }
      console.log(frontmatter.data.title);
      if (!frontmatter.data.unsplashImgCoverId) {
        console.warn(`unsplashImgCoverId is empty`)
        continue;
      }
      await writeFrontmatter(markdownPath, frontmatter, "unsplash");
    }
  }
  console.timeEnd("addUuidToMarkdown");
  console.timeEnd("inject-uuid");
}

main();
