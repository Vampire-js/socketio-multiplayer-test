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

let players = []
io.on('connection', (socket) => {
  
  io.emit("player-join", players)
   socket.on("player-join", e => {
    players.push(e)
    console.log(players)
   })
  });
server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});