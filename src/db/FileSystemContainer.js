import fs from "fs/promises";
import {v4 as uuid} from 'uuid'
import {createTimestamp} from '../utils/timestamp.js';
const BASE_DBFILES_PATH = process.cwd() + "/src/db/";

class FileSystemContainer {
  constructor(fileName) {
    this.path = BASE_DBFILES_PATH + fileName;
  }

  async all() {
    try {
      const fileData = await fs.readFile(this.path, { encoding: "utf-8" });
      const data = await JSON.parse(fileData);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async save(entity) {
    try {
      const data = await this.all();
      const timestamp = createTimestamp();
      const newEntity = { id: uuid(), timestamp, ...entity };
      data.push(newEntity);
      await fs.writeFile(this.path, JSON.stringify(data, null, 2));

      return newEntity;
    } catch (error) {
      const firstEntity = { id: uuid(), ...entity };
      await fs.writeFile(this.path, JSON.stringify([firstEntity], null, 2));

      return firstEntity;
    }
  }

  async getById(id) {
    const data = await this.all();
    const entity = data.find((ent) => ent.id == id);
    return entity;
  }

  async edit(id, changes) {
    const data = await this.all();
    let dataEdited = {}
    let item = {}
    const newData = data.map((ent) => {
      if (ent.id == id) {
        dataEdited = { ...ent, ...changes }
        item = ent
        return dataEdited;
      }
      return ent;
    });
    await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
    return dataEdited
  }

  async remove(id) {
    const data = await this.all();
    const newData = data.filter((ent) => ent.id != id);
    await fs.writeFile(this.path, JSON.stringify(newData, null, 2));
  }
}

export default FileSystemContainer;
