import fs from 'fs';
import { promisify } from 'util';

/**
Unused files
*/

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const defaultUnicode = 'utf8';

/**
 * DATA:
 *  {
 *    'pagePath': 'pageView'
 *    '/test': 32 ,
 *    '/about': 1 ,
 *  }
 */
class DataStore {

  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async safeReadFile() {
    try {
      return await readFile(this.path, defaultUnicode);
    } catch (e) {
      console.log(`Creating the store file: ${this.path}`)
      await writeFile(this.path, '',  defaultUnicode);
      return '';
    }
  }

  async getAll() {
    const data = await this.safeReadFile();
    if (data === '') return {};
    if (!this.isValidJSON(data)) {
      throw new Error('Invalid data');
    }
    return JSON.parse(data);
  }

  isValidJSON(text) {
    try {
      JSON.parse(text);
    } catch (e) {
      return false;
    }
    return true;
  }

  isExist(data, uuid: string) {
    return uuid in data;
  }

  async add(uuid: string, refPath: string) {
    const loadedData = await this.getAll();
    if (this.isExist(loadedData, uuid)) {
      console.warn(`The '${uuid}' key is existing, please try again.`);
      return;
    }
    loadedData[uuid] = refPath;
    await writeFile(this.path, JSON.stringify(loadedData), defaultUnicode);
  }

  async correctData(uuids: string[], paths: string[]) {
    const loadedData = await this.getAll();
    uuids.forEach((uuid, index) => {
      loadedData[uuid] = paths[index];
    });
    await writeFile(this.path, JSON.stringify(loadedData), defaultUnicode);
  }

  async saveData(data: any) {
    await writeFile(this.path, JSON.stringify(data), defaultUnicode);
  }

}

export default DataStore;
