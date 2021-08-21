import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const lstat = promisify(fs.lstat);

interface lstatWorker {
  files: string[];
  instances: Promise<fs.Stats>[];
}

interface readdirWorker {
  parentDir: string[];
  instances: Promise<string[]>[];
}

// https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/
export const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};

export async function getAllMarkdownPathsAsync(directoryAbsolutePath: string, targetPath: string) {
  const markdownExt = /\.md$/;
  const markdownPaths: string[] = [];
  try {
    const files = await readdir(directoryAbsolutePath) || [];
    markdownPaths.push(...files.filter((file) => markdownExt.test(file)));

    const lstatWorker: lstatWorker = { files: [], instances: [] };
    for (const file of files) {
      const absolutePath = path.resolve(targetPath, file);
      lstatWorker.instances.push(lstat(absolutePath));
      lstatWorker.files.push(file);
    }

    const stats = await Promise.all(lstatWorker.instances);
    const dirs = stats
      .map((stat, index) => stat.isDirectory() ? lstatWorker.files[index] : '')
      .filter(file => file !== '');

    const readdirWorker: readdirWorker = {parentDir: [], instances: []};
    for (const dir of dirs) {
      const absolutePath = path.resolve(targetPath, dir);
      readdirWorker.instances.push(readdir(absolutePath));
      readdirWorker.parentDir.push(dir);
    }

    const readdirs = await Promise.all(readdirWorker.instances);
    readdirs.forEach( (files, index) => {
      markdownPaths.push(...files.filter((file) => markdownExt.test(file)).map(file => path.join(readdirWorker.parentDir[index], file)));
    });

  } catch (err) {
    console.log("Unable to scan directory: " + err);
  }
  return markdownPaths;
}

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

// https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
const exec = promisify(require('child_process').exec);

export async function stageChangeGit(path: string) {
  try {
    const { stdout, stderr } = await exec(`git add ${path}`);
    console.log(`git add ${path}`);
    if (stdout) console.log('stageChangeGit [out]:', stdout);
    if (stderr) console.log('stageChangeGit [err]:', stderr);
  } catch (err) {
    console.error(err);
  };
}
