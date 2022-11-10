import messageService from '../services/messages.service.js'

export class ChatEventList {
  constructor(){}

  // Este metodo se ejecuta al momento de inicializarse la coneccion
  // Es utilizado dentro del metodo de configuracion de una instancia de SocketConfig
  async execOnConnection(socket){
    const messages = await messageService.all();
    socket.emit('update_messages', messages);
  }

  async getListenEvents() {
    return [
      {
        name: "publish_message",
        callback: async (_io, _socket, message) => {
          await messageService.save(message);
        },
      },
    ];
  }
}
