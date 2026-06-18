export class Paddle {
    constructor() {
        this.width = 100;
        this.height = 20;
        this.x = 600;
        this.y = 600;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 10);
        ctx.fill();
        ctx.restore();
    }
    update(mouseX, canvasWidth){
        this.x = mouseX - this.width / 2;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
        
    }


}