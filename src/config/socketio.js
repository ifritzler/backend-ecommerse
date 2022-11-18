import { ioServer } from "./http.js";

class SocketRouter {
  constructor() {
    this.io = ioServer;
    this.events = [];

    this.onInit();
    this.onClose();
  }

  async onInit(callback = () => {}) {
    this.init = callback;
  }

  async onClose(callback = () => {}) {
    this.close = callback;
  }

  listen(name, callback) {
    this.events.push({ name, callback });
  }

  sendEveryone(eventName, data) {
    this.io.emit(eventName, data);
  }
}

class SocketConfig {
  constructor() {
    this.server = ioServer;
    this.routers = [];

    this.onInit();
    this.onClose();
  }

  async onInit(
    callback = (io, socket) => {
      console.log(`User with id ${socket.id} is connected.`);
    }
  ) {
    this.init = callback;
  }

  async onClose(
    callback = (io, socket) => {
      console.log(`User with id ${socket.id} is disconnected.`);
    }
  ) {
    this.close = callback;
  }

  use(socketRouter) {
    this.routers.push(socketRouter);
  }

  exec() {
    this.server.on("connection", async (socket) => {
      this.init(this.server, socket);
      this.routers.forEach(async (router) => {
        await router.init(this.server, socket);

        router.events.forEach((event) => {
          // TODO
          socket.on(event.name, (data) => {
            event.callback(socket, data);
          });
        });
        socket.on("disconnect", async () => {
          await router.close(this.server, socket);
          this.close(this.server, socket);
        });
      });
    });
    this.server.on("disconnect", async (socket) => {
      this.server.emit("server_disconnect", {});
    });
  }
}

export { SocketRouter, SocketConfig };
