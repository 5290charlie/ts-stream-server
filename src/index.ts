import fs from 'fs';
import path from 'path';
import net, { Socket } from 'net';
import tls, { Server, TLSSocket, TLSSocketOptions } from 'tls';
import ws, { WebSocketServer, WebSocket } from 'ws';
import http, { IncomingMessage, ServerResponse as WebServerResponse } from 'http';
import https, { Server as WebServer } from 'https';
import express, { Express } from 'express';
import session from 'express-session';
import cors from 'cors';
import socketio, { Server as SocketServer } from 'socket.io';

const { PORT = 8080 } = process.env;

const app = express();
const web = http.createServer(app);
const io = new SocketServer(web, {
  cors: {
    origin: 'http://localhost:3000',
    credentials: true
  }
});

io.on('connection', (socket) => {
  console.log('Connected', socket);
});

web.listen(PORT, () => {
  console.log(`webserver running on ${PORT}`);
});
