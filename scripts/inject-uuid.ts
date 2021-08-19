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

const databasePath = 'uuid-store.json';
const targetPath = "content";
const defaultUnicode = 'utf8';

async function main() {
  const store = new DataStore(path.resolve(databasePath));
  const markdownPaths = await getAllMarkdownPaths(path.resolve(targetPath), targetPath);
  for (const mdPath of markdownPaths) {
    const absoluteMarkdownPath = path.resolve(targetPath, mdPath);
    // Get frontmatter
    const frontmatter = matter(await readFile(absoluteMarkdownPath, defaultUnicode));
    const uuid = generateUUID(7);

    if (!('uuid' in frontmatter.data)){
      // Save used uuid in file.
      await store.add(uuid, mdPath);
      frontmatter.data.uuid = uuid;
      await writeFile(absoluteMarkdownPath, matter.stringify(frontmatter.content, frontmatter.data), defaultUnicode);
      console.log(`[ADD] uuid of ${mdPath}`)
    } else {
      console.log(`[SKIP] uuid of ${mdPath} is existing.`)
    }

  }
}

main();
