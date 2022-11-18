import messageSocket from "../controllers/chat.socket.js";
import { DbContainer } from "../db/DbContainer.js";
import HttpError from "../utils/HttpError.js";

class MessagesService {
  constructor() {
    this.repository = new DbContainer("messages");
  }

  async all() {
    try {
      return await this.repository.all();
    } catch (error) {
      return [];
    }
  }
  async getById(id) {
    try {
      // if (!entity)
      const message = await this.repository.getById(id);
      if (!message) throw new HttpError(`Message with id ${id} not found`, 404);
      return message;
    } catch (error) {
      throw error;
    }
  }
  async save(message) {
    try {
      message.date = new Date().toISOString();
      const newMessage = await this.repository.save(message);
      messageSocket.sendEveryone("new_message", message);
      return newMessage;
    } catch (error) {
      throw error;
    }
  }

  async remove(id) {
    try {
      await this.repository.remove(id);
    } catch (error) {
      throw error;
    }
  }
}

export default new MessagesService();
