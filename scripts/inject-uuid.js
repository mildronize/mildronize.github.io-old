// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

import { readdir, lstat } from "fs/promises";
import path from "path";
const targetPath = "content";

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

// joining path of directory
const directoryPath = path.resolve(targetPath);
const markdownExt = /\.md$/;

async function getAllMarkdownPaths(directoryPath) {
  const markdownPaths = [];
  try {
    const files = await readdir(directoryPath);
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
}

async function main() {
  const markdownPaths = await getAllMarkdownPaths(directoryPath);
}

main();
