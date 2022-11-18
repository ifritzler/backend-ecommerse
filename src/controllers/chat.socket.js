import { SocketRouter } from "../config/socketio.js";
import messagesService from "../services/messages.service.js";

const socketRouter = new SocketRouter()

socketRouter.listen('publish_message', async (socket, message) => {
  await messagesService.save(message);
})

export default socketRouter;
