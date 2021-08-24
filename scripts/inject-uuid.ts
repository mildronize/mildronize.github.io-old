// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { promisify } from 'util';
import DataStore from "./DataStore";
import { getAllMarkdownPaths, retryNewUuid, stageChangeGit } from './utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);

const databasePath = 'uuid-store.json';
const targetPath = "content";
const defaultUnicode = 'utf8';
const ignoreDirs: RegExp[] = [
  // /^_/,   // Start with `_` (underscore)
];

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

async function main() {
  const markdownPaths = await getAllMarkdownPaths(targetPath);
  const { uuidStore, markdownFiles } = await getUuidStore(markdownPaths, targetPath);
  console.log(`Started running to inject uuid on Markdown ${markdownPaths.length} files`);

  markdownFiles.forEach(async (readFile, index) => {
    const mdPath = markdownPaths[index];
    const absoluteMarkdownPath = path.resolve(targetPath, mdPath);
    // Get frontmatter
    const frontmatter = matter(readFile);
    const uuid = retryNewUuid(uuidStore);

    if (!('uuid' in frontmatter.data)) {
      frontmatter.data.uuid = uuid;
      await writeFile(absoluteMarkdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
      // Auto stage change in git
      await stageChangeGit(path.join(targetPath, mdPath));
      console.log(`[ADD] uuid of ${mdPath}`);
    } else {
      // console.log(`[SKIP] uuid of ${mdPath} is existing.`);
    }
  });
}

main();
