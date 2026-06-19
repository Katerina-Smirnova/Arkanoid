export class Paddle {
    constructor() {
        this.width = 100;
        this.height = 20;
        this.x = 600;
        this.y = 600;
    }
    draw(ctx) {
        ctx.save();
        // Тень для всей платформы
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 15;
        ctx.fillStyle = '#ff4444';
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 10);
        ctx.fill();
        ctx.shadowColor = 'transparent'; 
        ctx.shadowBlur = 0;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillStyle = '#9eaab6';
        ctx.beginPath();
        const borderWidth = 15; 
        ctx.rect(this.x + borderWidth,  this.y, this.width - borderWidth * 2, this.height);
        ctx.fill();
        ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.fillRect(this.x + 2, this.y + 3, this.width - 5, 4);
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