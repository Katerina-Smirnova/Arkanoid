export class Brick {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 25;
        // this.hp = hp;
        this.color = color;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)'; 
        ctx.shadowBlur = 10; 
        ctx.shadowOffsetX = 15;   
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 1;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.restore();
    }

}