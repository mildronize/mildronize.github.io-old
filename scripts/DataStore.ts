import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

const defaultUnicode = 'utf8';

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
    /**
     * DATA:
     *  {
     *    '80cv2rqw': '2015-05-03-how-to-setup-this-blog.md' ,
     *    '3ugsgkg': '2015-05-04-simple-soap-client-and-simple-server-via-flask.md'
     *  }
     */
    const loadedData = await this.getAll();
    if (this.isExist(loadedData, uuid)) {
      console.warn(`The '${uuid}' key is existing, please try again.`);
      return;
    }
    loadedData[uuid] = refPath;
    await writeFile(this.path, JSON.stringify(loadedData), defaultUnicode);
  }
}

export default DataStore;
