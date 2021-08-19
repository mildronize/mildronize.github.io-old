import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
export const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};


export async function getAllMarkdownPaths(directoryAbsolutePath: string, targetPath: string) {
  const markdownExt = /\.md$/;
  const markdownPaths: string[] = [];
  try {
    const files = await readdir(directoryAbsolutePath) || [];
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
  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
  return markdownPaths;
}

export function generateUUID(length) {
  // https://gist.github.com/6174/6062387
  if (length > 10) throw Error('No more than 10 chars');
  return Math.random().toString(36).substring(2, 2 + length);
}
