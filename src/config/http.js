import express from "express";
import {Server as HttpServer} from "http";
import { Server as IoServer } from "socket.io";

const app = express();
const httpServer = new HttpServer(app);
const ioServer = new IoServer(httpServer);

export {
  app, httpServer, ioServer
}