import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";
export class Game{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paddle = new Paddle();
        this.ball = new Ball();
        this.mouseX = canvas.width / 2;

        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
    }
    update(){
        this.paddle.update(this.mouseX, this.canvas.width);
        this.ball.update(this.canvas.width, this.canvas.height, this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);;
    }
    gameLoop(){
        this.update();
        this.draw();
        requestAnimationFrame(() => this.gameLoop())
    }
   
    start() {
        this.gameLoop();
    }
}
