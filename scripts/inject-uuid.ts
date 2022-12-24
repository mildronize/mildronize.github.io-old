// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5
import dotenv from 'dotenv';
import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { promisify } from 'util';
import { createApi } from 'unsplash-js';
import nodeFetch from 'isomorphic-fetch';
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

const targetPath = "content";
const defaultUnicode = 'utf8';
let isAddUnsplashCover = false;
let isStageChangeMode = false;
let unsplash;

const firstArg = process.argv[2];
if(firstArg === 'add-unsplash'){
  isAddUnsplashCover = true;
  isStageChangeMode = true;
} else if(firstArg === 'stage-changes'){
  isStageChangeMode = true;
}

if(isAddUnsplashCover){
  unsplash = createApi({
    accessKey: unsplashAccessKey,
    fetch: nodeFetch,
  });
}

async function checkUnsplashAccessToken(){
   const result = await unsplash?.photos.getRandom({ count: 1 });
    if(result?.type === 'error'){
      throw Error(result.errors)
    }
}

if(!unsplashAccessKey && isAddUnsplashCover){
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

async function getUnsplashImageId(limit: number, queries: string[]){
  const imageIds = [];
  if(queries.length === 0) return await getRandomUnsplashImageId();
  console.log(`Searching ${limit} photos with '${queries[0]}' keywords`);
  const result = await unsplash.search.getPhotos({
    query: queries[0],
    page: 1,
    perPage: limit,
    orientation: 'landscape',
  });

  // console.log(result);

  if(result.response?.results.length === 0){
    // Remove first element
    return getUnsplashImageId(limit, queries.slice(1));
  }

  result.response.results.forEach(result =>{
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
      throw new Error(`The uuid is duplicating, please fix this issue before run this command again ${frontmatter.data.uuid}`);
    uuids[frontmatter.data.uuid] = markdownPaths[index];
  });

  return {
    uuidStore: uuids,
    markdownFiles: readFiles
  };
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
  for(let index = 0; index < markdownFiles.length; index++) {
    const readFile = markdownFiles[index];
    const mdPath = markdownPaths[index];
    const absoluteMarkdownPath = path.resolve(targetPath, mdPath);
    // Get frontmatter
    const frontmatter = matter(readFile);
    const uuid = retryNewUuid(uuidStore);
    if (!('uuid' in frontmatter.data)) {
      frontmatter.data.uuid = uuid;
      await writeFile(absoluteMarkdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
      if(isStageChangeMode){
        // Auto stage change in git
        await stageChangeGit(path.join(targetPath, mdPath));
      }
      console.log(`[ADD] uuid of ${mdPath}`);
    }

    if (!('unsplashImgCoverId' in frontmatter.data) && isAddUnsplashCover && unsplashAccessKey) {
      const tags = Array.isArray(frontmatter.data.tags) ? frontmatter.data.tags: [];
      if(tags.length === 0) continue;
      try{
        frontmatter.data.unsplashImgCoverId = await getUnsplashImageId(3, tags);
      } catch(error) {
        console.error('Cannot get unsplash', error)
      }
      console.log(frontmatter.data.title);
      if(!frontmatter.data.unsplashImgCoverId) {
        console.warn(`unsplashImgCoverId is empty`)
        continue;
      }
      await writeFile(absoluteMarkdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
      if(isStageChangeMode){
        // Auto stage change in git
        await stageChangeGit(path.join(targetPath, mdPath));
      }

      console.log(`[ADD] unsplash image id of ${mdPath}`);
    }
  }
  console.timeEnd("addUuidToMarkdown");
  console.timeEnd("inject-uuid");
}

main();

// getUnsplashImageId(3, '')
// console.log(randomRange(1,1))
