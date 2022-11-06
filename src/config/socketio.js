import {Server as socketServer} from 'socket.io';

export class CustomSocket {
  constructor(app) {
    this.io = new socketServer(app)
    this.configSockets()
  }

  configSockets() {
    this.io.on('connection',(socket) => {
      console.log('User connected', socket?.id)
    })
  }
}