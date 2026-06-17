export class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 40;
    }
    draw(ctx) {
        ctx.beginPath();
        ctx.fillStyle = 'orange';
        ctx.strokeStyle = 'red';
      
        ctx.lineWidth = 3;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.fill();
    }

}