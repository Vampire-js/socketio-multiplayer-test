export class Box {
  constructor(c, socket) {
    this.c = c
    this.position = { x: 0, y: 0 }
    this.velocity = { x: 0, y: 0 }
    this.color = "white"
    this.enableControls = true
    this.socket = socket
    this.name = ""
  }
  addControls() {
    document.onkeydown = e => {
      switch (e.key) {
        case "w":
          // this.velocity.y = -2
          this.socket.emit("keydown", "w")
          break;
        case "a":
          // this.velocity.x = -2
          this.socket.emit("keydown", "a")

          break;
        case "d":
          // this.velocity.x = 2
          this.socket.emit("keydown", "d")

          break;
        case "s":
          // this.velocity.y = 2
          this.socket.emit("keydown", "s")

          break;
      }
    }

    document.onkeyup = e => {
      // this.velocity = {x:0 , y:0}
      this.socket.emit("keyup", "")
    }
  }
  draw() {
    this.c.fillStyle = this.color
    this.c.fillRect(this.position.x, this.position.y, 20, 20)

    this.c.font = "15px Arial";
    this.c.fillText(this.name, this.position.x, this.position.y - 5)

    //Controls

    this.addControls()

  }
  update() {
    this.draw()
  }
}