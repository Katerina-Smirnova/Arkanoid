import { Paddle } from "./paddle.js"
import { Ball } from "./ball.js";
import { Brick } from "./brick.js";
export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.paddle = new Paddle();
        this.ball = new Ball();
        this.mouseX = canvas.width / 2;
        this.score = 0;
        this.level = 1;
        this.levels = {
            1:
                [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            2:
                [[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            3:
                [[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]],
            4:
                [[6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6],
                [1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
                [0, 6, 0, 6, 0, 6, 0, 6, 0, 6, 0],
                [0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0],
                [6, 0, 6, 0, 6, 0, 6, 0, 6, 0, 6],
                [3, 0, 3, 0, 3, 0, 3, 0, 3, 0, 3]],
            5:
                [[6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
                [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
                [2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2],
                [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
                [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
                [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5]]
        }
        this.rowColor = { 1: '#ff4444', 2: '#ffd700', 3: '#339af0', 4: '#f06595', 5: '#51cf66', 6: '#868e96' }
        this.gameActive = true;
        this.brickHit = false;
        this.bricks = [];
        this.message = null;
        this.messageColor = null;
        this.createLevel(this.levels[this.level])
        canvas.addEventListener('mousemove', (e) => {
            const rect = canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
        });

    }
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.paddle.draw(this.ctx);
        this.ball.draw(this.ctx);
        this.bricks.forEach(brick => brick.draw(this.ctx));
        if (this.message) {
            this.showMessage(this.message, this.messageColor);
        }
    }
    update() {
        if (!this.gameActive) return;
        this.paddle.update(this.mouseX, this.canvas.width);
        this.ball.update(this.canvas.width, this.canvas.height, this.paddle.x, this.paddle.y, this.paddle.width, this.paddle.height);
        this.collisionWithBrick();
        this.checkEnd();
    }
    gameLoop() {
        if (!this.gameActive) return;
        this.update();
        this.draw();
        this.renderScore();
        requestAnimationFrame(() => this.gameLoop())
    }

    start() {
        this.gameActive = true;
        this.gameLoop();
    }
    collisionWithBrick() {
        this.brickHit = false;
        for (let i = this.bricks.length - 1; i >= 0; i--) {
            const brick = this.bricks[i];
            if (this.checkCollision(brick)) {
                if (brick.hp === 1) {
                    this.bricks.splice(i, 1);
                }
                else {
                    brick.hp -= 1
                    brick.color = '#bec3ce'
                }
                this.ball.dy = -this.ball.dy;
                this.brickHit = true;
                this.score += 10;
                break;
            }

        }
    }
    checkCollision(brick) {
        return this.ball.x + this.ball.radius > brick.x &&
            this.ball.x - this.ball.radius < brick.x + brick.width &&
            this.ball.y + this.ball.radius > brick.y &&
            this.ball.y - this.ball.radius < brick.y + brick.height;
    }
    renderScore() {
        document.getElementById('levelDisplay').textContent = this.level;
        document.getElementById('scoreDisplay').textContent = this.score;
    }
    checkEnd() {
        if (this.bricks.length === 0) {
            this.message = 'Winning!';
            this.messageColor = '#ffd700';
            this.gameActive = false;
            setTimeout(() => {
                if (this.level < 5) {
                    this.level += 1;
                } else {
                    this.level = 1;
                }
                this.message = null;
                this.restart();
            }, 1500);
        }
        else if (this.ball.y > this.canvas.height) {
            this.message = 'Defeat!';
            this.messageColor = '#ff4444';
            this.gameActive = false;
            setTimeout(() => {
                this.message = null;
                this.restart();
            }, 1500);
        }
    }
    showMessage(text, color) {
        this.ctx.save();
        this.ctx.font = '48px "Press Start 2P", cursive';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';

        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
        this.ctx.shadowBlur = 10;
        this.ctx.shadowOffsetX = 3;
        this.ctx.shadowOffsetY = 3;

        this.ctx.fillStyle = color;
        this.ctx.fillText(text, this.canvas.width / 2, this.canvas.height / 2);
        this.ctx.restore();
    }
    restart() {
        this.gameActive = false;
        this.score = 0;
        this.ball = new Ball();
        this.paddle = new Paddle();
        this.bricks = [];
        this.createLevel(this.levels[this.level])

        setTimeout(() => {
            this.gameActive = true;
            this.gameLoop();
        }, 1000);

    }
    createLevel(levelMatrix) {
        for (let i = 0; i < levelMatrix.length; i++) {
            for (let j = 0; j < levelMatrix[i].length; j++) {
                if (levelMatrix[i][j] > 0) {
                    this.bricks.push(new Brick(j * 80, (i + 1) * 25, this.rowColor[levelMatrix[i][j]]));
                }
            }
        }
    }

}
