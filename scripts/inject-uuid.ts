// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { promisify } from 'util';
import DataStore from "./DataStore";

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);
const readFile = promisify(fs.readFile);

const databasePath = 'scripts/used-uuid.json';
const targetPath = "content";

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

// joining path of directory
const directoryPath = path.resolve(targetPath);
const markdownExt = /\.md$/;

async function getAllMarkdownPaths(directoryPath: string) {
  const markdownPaths: string[] = [];
  try {
    const files = await readdir(directoryPath) || [];
    markdownPaths.push(...files.filter((file) => markdownExt.test(file)));
    const dirs = await asyncFilter(files, async (file) => {
      const absolutePath = path.resolve(targetPath, file);
      const stat = await lstat(absolutePath);
      return stat.isDirectory();
    });
    for (const dir of dirs) {
      const absolutePath = path.resolve(targetPath, dir);
      const files = await readdir(absolutePath);
      markdownPaths.push(...files.filter((file) => markdownExt.test(file)).map(file => path.join(dir, file)));
    }
    console.log(markdownPaths);
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
  return markdownPaths;
}

function generateUUID(length) {
  // https://gist.github.com/6174/6062387
  if (length > 10) throw Error('No more than 10 chars');
  return Math.random().toString(36).substring(2, 2 + length);
}



async function main() {
  const markdownPaths = await getAllMarkdownPaths(directoryPath);
  for (const mdPath of markdownPaths) {
    const frontmatter = matter(await readFile(path.resolve(targetPath, mdPath), 'utf8'));
    console.log(frontmatter);
    const uuid = generateUUID(7);
    if (!('uuid' in frontmatter.data)) frontmatter.data.uuid = uuid;
    console.log(matter.stringify(frontmatter.content, frontmatter.data));
    break;
  }
}

async function a() {
  const store = new DataStore(path.resolve(databasePath));
  store.add('wefwef', '/path');
  console.log(await store.getAll());
}
a();

