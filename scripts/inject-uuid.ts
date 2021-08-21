// 2aa33374 = random string [a-z,0-9] with 8 chars
// Ref: https://medium.com/stackfame/get-list-of-all-files-in-a-directory-in-node-js-befd31677ec5

import fs from 'fs';
import matter from 'gray-matter';
import path from 'path';
import { promisify } from 'util';
import DataStore from "./DataStore";
import { getAllMarkdownPaths, generateUUID } from './utils';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
// https://medium.com/stackfame/how-to-run-shell-script-file-or-command-using-nodejs-b9f2455cb6b7
const exec = promisify(require('child_process').exec);

const databasePath = 'uuid-store.json';
const targetPath = "content";
const defaultUnicode = 'utf8';

async function stageChangeGit(path: string) {
  try {
    const { stdout, stderr } = await exec(`git add ${path}`);
    console.log(`git add ${path}`);
    if (stdout) console.log('stageChangeGit [out]:', stdout);
    if (stderr) console.log('stageChangeGit [err]:', stderr);
  } catch (err) {
    console.error(err);
  };
}

async function main() {
  const store = new DataStore(path.resolve(databasePath));
  const markdownPaths = await getAllMarkdownPaths(path.resolve(targetPath), targetPath);
  console.log(`Started running to inject uuid on Markdown ${markdownPaths.length} files`);
  for (const mdPath of markdownPaths) {
    const absoluteMarkdownPath = path.resolve(targetPath, mdPath);
    // Get frontmatter
    const frontmatter = matter(await readFile(absoluteMarkdownPath, defaultUnicode));
    const uuid = generateUUID(7);

    if (!('uuid' in frontmatter.data)) {
      // Save used uuid in file.
      await store.add(uuid, mdPath);
      frontmatter.data.uuid = uuid;
      await writeFile(absoluteMarkdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
      // Auto stage change in git
      await stageChangeGit(path.join(targetPath, mdPath));
      console.log(`[ADD] uuid of ${mdPath}`);
    } else {
      // console.log(`[SKIP] uuid of ${mdPath} is existing.`);
    }

  }
}

main();
