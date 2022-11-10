import messagesService from "../services/messages.service.js";

export const chatEvents = () => {
  return [
    {
      name: "publish_message",
      callback: async (message) => {
        await messagesService.save(message);
      },
    },
  ];
};
