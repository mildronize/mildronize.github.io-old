import fs from 'fs';
import { promisify } from 'util';

const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);


class DataStore {

  private path: string;

  constructor(path: string) {
    this.path = path;
  }

  async getAll() {
    const data = await readFile(this.path, "utf8");
    if(data === '') return {};
    if(!this.isValidJSON(data)){
      throw new Error('Invalid data');
    }
    return data;
  }

  isValidJSON(string) {
    try {
      JSON.parse(string);
    } catch (e) {
      return false;
    }
    return true;
  }

  async isExist(data, uuid) {
    return uuid in data;
  }

  async add(uuid, refPath) {
    /**
     * DATA:
     *  {
     *    '80cv2rqw': '2015-05-03-how-to-setup-this-blog.md' ,
     *    '3ugsgkg': '2015-05-04-simple-soap-client-and-simple-server-via-flask.md'
     *  }
     */
    const loadedData = this.getAll();
    if (this.isExist(loadedData, uuid)) {
      console.warn(`The '${uuid}' key is existing, please try again.`);
      return;
    }
    loadedData[uuid] = refPath;
    await writeFile(this.path, JSON.stringify(loadedData), "utf8");
  }
}

export default DataStore;
