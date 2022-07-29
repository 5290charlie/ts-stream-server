import fs, { watch } from 'fs';
import path from 'path';
// import net, { Socket } from 'net';
// import tls, { Server, TLSSocket, TLSSocketOptions } from 'tls';
import ws, { WebSocketServer, WebSocket } from 'ws';
import http, { IncomingMessage, ServerResponse as WebServerResponse } from 'http';
import https, { Server as WebServer } from 'https';
import express, { Express } from 'express';
import session from 'express-session';
import cors from 'cors';
import socketio, { Socket, Server as SocketServer } from 'socket.io';
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, RtcMsg } from './types';

const { PORT = 8080, CORS_ORIGIN = 'http://localhost:3000' } = process.env;

const app = express();
const web = http.createServer(app);
const io = new SocketServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, RtcMsg>(web, {
  cors: {
    origin: CORS_ORIGIN,
    credentials: true
  }
});

let streamer: Socket | null = null;
const clients: Socket[] = [];
const watchers: { [id: string]: Socket } = {};

io.on('connection', (socket) => {
  console.log('Connected', socket.id);

  clients.push(socket);

  socket.on('reg', (role) => {
    if (role === 'streamer') {
      console.log('Streaming', socket.id);
      streamer = socket;
    } else {
      console.log('Watching', socket.id);
      watchers[socket.id] = socket;
    }
  });

  socket.on('offer', (msg) => {
    console.log('Offer', msg);
    if (socket.id == streamer?.id) {

    } else if (streamer) {
      socket.to(streamer.id).emit('offer', msg);
    }
  });

  socket.on('answer', (msg) => {
    console.log('Answer', msg);
  });

  socket.on('candidate', (msg) => {
    console.log('Candidate', msg);
  });

  socket.on('disconnect', () => {
    console.log(`Disconnect: ${socket.id}`);
    if (watchers[socket.id]) {
      delete watchers[socket.id];
    }
  });
});

web.listen(PORT, () => {
  console.log(`webserver running on ${PORT}`);
});
