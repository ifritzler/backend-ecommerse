import { Server } from 'socket.io';
import { chatEvents } from '../controllers/chat.socket.js';

export class CustomSocket {
  constructor(httpServer) {
    this.io = new Server(httpServer)
    // Registro de eventos
    this.configSocket(chatEvents())
  }

  configSocket(events = []) {
    this.io.on('connection',(socket) => {
      console.log('User connected', socket?.id)
      if(events){
        events.forEach(socketEvent => {
          socket.on(socketEvent.name, socketEvent.callback);
        });
      }
    })    
  }

  addEvent(name, cb) {
    this.io.on(name, cb)
  }

  emitEvent(name, data) {
    this.io.emit(name, data)
  }
}