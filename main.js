import { io } from "socket.io-client";

const socket = io("http://localhost:4000")

const btn = document.getElementById("btn")
const inp = document.getElementById("inp")

btn.onclick = () => {
  if(inp.value != ""){
    socket.emit("player-join", {
      name: inp.value
    })
    window.location.href = './screens/game-screen/game.html'
    
  }else{
    alert("Your name can't be 'nothing'")
  }
}