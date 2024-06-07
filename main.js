import { Box } from './classes/box';
import './style.css'
import { v4 as uuidv4 } from 'uuid';

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

const players =  {}

socket.on("updatePlayers", (backendPlayers) => {
console.log(backendPlayers)
for(const id in backendPlayers){
  const backendPlayer = backendPlayers[id]
 if(!players[id]){
  players[id] = new Box(c , socket)
  players[id].position = {x: backendPlayer.x , y:backendPlayer.y}
  players[id].color = backendPlayer.color
 }else{
  players[id].position = {x: backendPlayer.x , y:backendPlayer.y}
  players[id].color = backendPlayer.color
  
 }
}

for(const id in players){
  if(!backendPlayers[id]){
    delete players[id]
  }
}
})
const animate = () => {

  c.fillStyle = "#010d21"
  c.fillRect(0, 0, innerWidth, innerHeight)
  requestAnimationFrame(animate)

  for(const id in players){
    const player = players[id]
    player.draw()
  }
}

animate()