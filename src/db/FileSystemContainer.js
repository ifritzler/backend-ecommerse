import fs from "fs/promises";

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
      const newEntity = { id: data[data.length - 1].id + 1, ...entity };
      data.push(newEntity);
      await fs.writeFile(this.path, JSON.stringify(data));
      return newEntity;
    } catch (error) {
      const firstEntity = { id: 1, ...entity };
      await fs.writeFile(this.path, JSON.stringify([firstEntity], null, 4));
      return firstEntity;
    }
  }
  async getById(id) {
    const data = await this.all();
    const entity = data.find((ent) => ent.id == id);
    if (!entity) throw new Error(`Product with id ${id} not found`);

    return entity;
  }
  async edit(id, changes) {
    const data = await this.all();
    const newData = data.map((ent) => {
      if (ent.id == id) {
        return { ...ent, ...changes };
      }
      return ent;
    });
    await fs.writeFile(this.path, JSON.stringify(newData, null, 4));
  }
  async remove(id) {
    const data = await this.all();
    const newData = data.filter((ent) => ent.id != id);
    await fs.writeFile(this.path, JSON.stringify(newData, null, 4));
  }
}

export default FileSystemContainer;
