import {Server} from 'socket.io';

export class CustomSocket {
  constructor(httpServer) {
    this.io = new Server(httpServer)
    this.configSockets()
  }

  configSockets() {
    this.io.on('connection',(socket) => {
      console.log('User connected', socket?.id)
    })
  }

  addEvent(name, cb) {
    this.io.on(name, cb(socket))
  }

  emitEvent(name, data) {
    this.io.emit(name, data)
  }
}