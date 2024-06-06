export class Box {
    constructor(c) {
      this.c = c
      this.position = { x: 0, y: 0 }
      this.velocity = { x: 0, y: 0 }
      this.color =  null
    }
    draw() {
      this.c.fillStyle = this.color
      this.c.fillRect(this.position.x, this.position.y, 50, 50)
  
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
  
      //Controls
      document.onkeydown = e => {
        switch (e.key) {
          case "w":
            this.velocity.y = -2
            break;
          case "a":
            this.velocity.x = -2
            break;
          case "d":
            this.velocity.x = 2
            break;
          case "s":
            this.velocity.y = 2
            break;
        }
      }
  
      document.onkeyup = e => {
        this.velocity = {x:0 , y:0}
      }
    }
    update() {
      this.draw()
    }
  }