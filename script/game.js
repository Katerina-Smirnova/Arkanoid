import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";
import { Brick } from "./brick.js";
export class Game{
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paddle = new Paddle();
        this.ball = new Ball();
        this.mouseX = canvas.width / 2;
        this.score = 0;
        this.gameActive = true;
        this.brickHit = false;
        this.bricks = [];
        for (let i = 0; i < 16; i++) {
            if(i<8){
                this.bricks.push(new Brick(i * 100, 20));
            }
            else{
                this.bricks.push(new Brick((i - 8) * 100, 60));
            }
        }
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });
        
    }
    draw(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.bricks.forEach(brick => brick.draw(this.ctx));
    }
    update(){
        if (!this.gameActive) return; 
        this.paddle.update(this.mouseX, this.canvas.width);
        this.ball.update(this.canvas.width, this.canvas.height, this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.collisionWithBrick();
        this.checkEnd();
    }
    gameLoop(){
        this.update();
        this.draw();
        this.renderScore();
        requestAnimationFrame(() => this.gameLoop())
    }
   
    start() {
        this.gameActive = true;
        this.gameLoop();
    }
    collisionWithBrick(){
        this.brickHit = false;
        for (let i = this.bricks.length - 1; i >= 0; i-- ){
            const brick = this.bricks[i];
            if (this.checkCollision(brick)){
                this.bricks.splice(i, 1);
                this.ball.dy = -this.ball.dy;
                this.brickHit = true; 
                this.score +=10;
                break;
            }

        }
    }
    checkCollision(brick){
        return this.ball.x + this.ball.radius > brick.x &&
            this.ball.x - this.ball.radius < brick.x + brick.width &&
            this.ball.y + this.ball.radius > brick.y &&
            this.ball.y - this.ball.radius < brick.y + brick.height;
    }
    renderScore(){
        this.ctx.font = '30px Arial';
        this.ctx.fillText(this.score, this.canvas.width - 70, this.canvas.height - 200 )
    }
    checkEnd(){
        if (this.bricks.length === 0 || this.ball.y > this.canvas.height){
            this.gameActive = false;
            setTimeout(() => {
                this.restart();
            }, 1000);
        }
    }
    restart() {
        this.gameActive = true;
        this.score = 0;
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.bricks = [];

        for (let i = 0; i < 16; i++) {
            if (i < 8) {
                this.bricks.push(new Brick(i * 100, 20));
            } else {
                this.bricks.push(new Brick((i - 8) * 100, 60));
            }
        }
    }
}
