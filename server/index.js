import express from 'express';
import { createServer } from 'node:http';
import { join } from 'node:path';
import { Server } from 'socket.io';
import cors from "cors"

const app = express();
app.use(cors())
const server = createServer(app);
const io = new Server(server, {
    cors: {
      origin: '*', // Allow all origins
      methods: ['GET', 'POST']
    }});

app.get('/', (req, res) => {
  res.send('hi')
});

let users = []
io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit("chat message", msg)
    });
  });
server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});