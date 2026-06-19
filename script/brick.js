export class Brick {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.width = 80;
        this.height = 25;
        this.hp = 1;
        this.color = color;
        if (this.color === '#868e96') {
            this.hp = 2;
        }
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
        ctx.shadowColor = 'transparent';
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(this.x + 2, this.y + 3, this.width - 5, 4);
        ctx.restore();
    }

}