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
        this.rowColor = { 1: 'red', 2: 'yellow', 3: 'blue', 4: 'pink', 5: 'green', 6: 'gray' }
        this.gameActive = true;
        this.brickHit = false;
        this.bricks = [];
        this.createLevel(this.level, this.levels[this.level])
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
                this.bricks.splice(i, 1);
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
        this.ctx.font = '30px Arial';
        this.ctx.fillText(this.score, this.canvas.width - 70, this.canvas.height - 200)
    }
    checkEnd() {
        if (this.bricks.length === 0) {
            if ((this.level + 1) < 6) {
                this.level += 1
                this.restart();
            }
            else {
                this.level = 1
                this.restart();
            }
        }
        else if (this.ball.y > this.canvas.height) {
            this.restart();
        }
    }
    restart() {
        this.gameActive = false;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.score = 0;
        this.ball = new Ball();
        this.paddle = new Paddle();
        console.log(this.ball.dy)
        this.bricks = [];
        this.createLevel(this.level, this.levels[this.level])

        setTimeout(() => {
            this.gameActive = true;
            this.gameLoop();
        }, 1000);

    }
    createLevel(level, levelMatrix) {
        let hp = 1;
        for (let i = 0; i < levelMatrix.length; i++) {
            console.log(levelMatrix[i].length)
            for (let j = 0; j < levelMatrix[i].length; j++) {
                if (levelMatrix[i][j] > 0) {
                    this.bricks.push(new Brick(j * 80, (i + 1) * 20, this.rowColor[levelMatrix[i][j]]));
                }
            }
        }
        console.log(this.bricks.length)
    }

}
