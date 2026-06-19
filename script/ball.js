export class Ball {
    constructor() {
        this.x = 300;
        this.y = 200;
        this.radius = 7;
        this.speed = 1;
        this.dx = 5;
        this.dy = 5;
    }
    draw(ctx) {
        ctx.save();
        ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        ctx.shadowBlur = 10;
        ctx.shadowOffsetX = 15;
        ctx.shadowOffsetY = 20;
        ctx.fillStyle = 'white'
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        ctx.fill();
        ctx.restore();
    }
    update(canvasWidth, canvasHeight, paddleX, paddleY, paddleWidth, paddleHeight) {
        if (this.x + this.dx > canvasWidth - this.radius || this.x + this.dx < this.radius) {
            this.dx = - this.dx
        }
        if (this.y + this.dy < this.radius) {
            this.dy = - this.dy
        }
        if (this.dy > 0 && this.x + this.dx >= paddleX - this.radius &&
            this.x + this.dx < paddleX + paddleWidth + this.radius && this.y + this.radius >= paddleY &&
            this.y + this.radius <= paddleY + paddleHeight + this.dy) {
            this.dy = - this.dy
        }
        if (this.y > canvasHeight){
            this.x = 300;
            this.y = 200;
        }
        this.x += this.dx;
        this.y += this.dy
    }
}
