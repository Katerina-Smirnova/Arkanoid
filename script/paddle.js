export class Paddle {
    constructor() {
        this.width = 100;
        this.height = 20;
        this.x = 400;
        this.y = 550;
    }
    draw(ctx) {
        ctx.fillStyle = '#00ff00';
        ctx.beginPath();
        ctx.roundRect(this.x, this.y, this.width, this.height, 10); // 10px радиус
        ctx.fill();
    }
    update(mouseX, canvasWidth){
        this.x = mouseX - this.width / 2;
        if (this.x < 0) this.x = 0;
        if (this.x + this.width > canvasWidth) {
            this.x = canvasWidth - this.width;
        }
        
    }


}