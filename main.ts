class Snake {
    body: { x: number; y: number }[];
    dx: number;
    dy: number;

    constructor() {
        this.body = [{ x: 10, y: 10 }];
        this.dx = 0;
        this.dy = 0;
    }

    update() {
        const newHead = {
            x: this.body[0].x + this.dx,
            y: this.body[0].y + this.dy,
        };

        this.body.unshift(newHead);
        this.body.pop();
    }

    changeDirection(dx: number, dy: number) {
        this.dx = dx;
        this.dy = dy;
    }
}

const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const snake = new Snake();
let food = { x: 20, y: 20 };

function drawSnake() {
    ctx.fillStyle = 'green';
    for (const segment of snake.body) {
        ctx.fillRect(segment.x * 20, segment.y * 20, 20, 20);
    }
}

// Draw snake food  (red square)
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);
}

function updateFood() {
    const newX = Math.floor(Math.random() * canvas.width / 20);
    const newY = Math.floor(Math.random() * canvas.height / 20);
    food = { x: newX, y: newY };
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    snake.update();
    drawSnake();
    drawFood();

    if (snake.body[0].x === food.x && snake.body[0].y === food.y) {
        updateFood();
    }

    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            snake.changeDirection(0, -1);
            break;
        case 'ArrowDown':
            snake.changeDirection(0, 1);
            break;
        case 'ArrowLeft':
            snake.changeDirection(-1, 0);
            break;
        case 'ArrowRight':
            snake.changeDirection(1, 0);
            break;
    }
});

gameLoop();