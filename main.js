import { Box } from './classes/box';
import './style.css'

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

const canvas = document.getElementById("canvas")
const c = canvas.getContext("2d")
canvas.width = innerWidth
canvas.height = innerHeight

let players = []

socket.emit("player-join", {
  posx: Math.random()*innerWidth,
  posy: Math.random()*innerHeight,
  velx: 0,
  vely:0,
  color: `#${Math.floor(Math.random()*16777215).toString(16)}`
} )

socket.on("player-join", e => {

  console.log(e)
  e.map(a => {
    let p = new Box(c)
    p.position = {x:a.posx , y:a.posy}
    p.velocity = {x:a.velx , y:a.vely}
    p.color = a.color
    p.draw()
    players.push(p)
  })
})

const animate = () => {

  c.fillStyle = "#010d21"
  c.fillRect(0, 0, innerWidth, innerHeight)

  
  players.map(e => e.update())

  requestAnimationFrame(animate)
}

animate()