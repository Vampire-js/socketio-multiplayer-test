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
    }} , {pingInterval:2000 , pingTimeout:5000});

app.get('/', (req, res) => {
  res.send('hi')
});

let players = {}
let name;
io.on('connection', (socket) => {
  console.log("user connected")
  socket.on("player-join" , e => {
    name = e.name
  })

  players[socket.id] = {
    x: 200 * Math.random(),
    y: 200 * Math.random(),
    color: `#${Math.floor(Math.random()*16777215).toString(16)}`,
    velx:0,
    vely:0,
    name:name
  }

  io.emit("updatePlayers", players)
  console.log(players)

  socket.on("disconnect", reason => {
    console.log(reason)
    delete players[socket.id]
    io.emit("updatePlayers", players)
  })

  socket.on("keydown", e => {

    let speed = 5
   
    switch (e) {
      case "w":
        players[socket.id].y += -speed

        break;
      case "a":
        players[socket.id].x += -speed

        break;
      case "d":
        players[socket.id].x += speed

        break;
      case "s":
        players[socket.id].y += speed

        break;

    
    }
    console.log(players)
  })

  socket.on("keyup", () =>{
    players[socket.id].velx = 0
    players[socket.id].vely = 0
  })
  });



  setInterval(() => {
    io.emit("updatePlayers", players)
  }, 0.0001)

server.listen(4000, () => {
  console.log('server running at http://localhost:4000');
});