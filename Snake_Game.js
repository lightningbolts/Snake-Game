const SQUARE_DIMENSION = 50;
const SNAKE_COLOR = "blue";

let canvasElement = document.getElementById("canvas");
let ctx = canvasElement.getContext("2d");

canvasElement.width = 800;
canvasElement.height = 800;

let cellWidth = canvasElement.width / SQUARE_DIMENSION;
let cellHeight = canvasElement.height / SQUARE_DIMENSION;

ctx.fillStyle = "grey";

function drawSnakeSegment(x, y) {
    ctx.fillRect(x, y, cellWidth, cellHeight);
    ctx.strokeRect(x, y, cellWidth, cellHeight);
}

for (let rows = 0; rows < SQUARE_DIMENSION; rows++) {
    for (let columns = 0; columns < SQUARE_DIMENSION; columns++) {
        drawSnakeSegment(rows * cellWidth, columns * cellHeight)
    }
}

let snake = {
    x: 8,
    y: 8,
    dir: "up",
    length: 2,
    segments: [{ x: SQUARE_DIMENSION / 2, y: SQUARE_DIMENSION / 2 }]
}

let food = {
    x: Math.floor(Math.random() * (SQUARE_DIMENSION + 1)),
    y: Math.floor(Math.random() * (SQUARE_DIMENSION + 1))
}

function drawFood() {
    ctx.fillStyle = "yellow"
    drawSnakeSegment(food.x * cellWidth, food.y * cellHeight)
}

for (let snakeSegment = 0; snakeSegment < snake.length; snakeSegment++) {
    snake.segments.push({ x: SQUARE_DIMENSION / 2, y: SQUARE_DIMENSION / 2 + 1 + snakeSegment });
}

function moveSnakeUp() {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x, y: head.y-1 })
}

function moveSnakeRight () {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x+1, y: head.y })
}

function moveSnakeLeft () {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x-1, y: head.y })
}

function moveSnakeDown () {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x, y: head.y+1 })
}

function growSnake () {
    let head = snake.segments[0]
    if (snake.dir === "up") {
        snake.segments.unshift({ x: head.x, y: head.y-1 })
    } else if (snake.dir === "right") {
        snake.segments.unshift({ x: head.x+1, y: head.y })
    } else if (snake.dir === "left") {
        snake.segments.unshift({ x: head.x-1, y: head.y })
    } else if (snake.dir === "down") {
        snake.segments.unshift({ x: head.x, y: head.y+1 })
    }
}

function drawSnake(reset) {
    ctx.fillStyle = SNAKE_COLOR;
    let head = snake.segments[0]
    if (head.x === food.x && head.y === food.y) {
        growSnake()
        food.x = Math.floor(Math.random() * (SQUARE_DIMENSION + 1))
        food.y = Math.floor(Math.random() * (SQUARE_DIMENSION + 1))
        drawFood()
    }
    for (let segmentIndex = 0; segmentIndex < snake.segments.length; segmentIndex++) {
        if (segmentIndex === 0) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = SNAKE_COLOR
        }
        if (reset) {
            ctx.fillStyle = "grey"
        }
        drawSnakeSegment(snake.segments[segmentIndex].x * cellWidth, snake.segments[segmentIndex].y * cellHeight)
    }
}
document.addEventListener('keydown', handleKeyDown);

function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
        snake.dir = "up"
    } else if (event.key === "ArrowRight") {
        snake.dir = "right"
    } else if (event.key === "ArrowLeft") {
        snake.dir = "left"
    } else if (event.key === "ArrowDown") {
        snake.dir = "down"
    }
    console.log(event)
}

drawSnake(false);
drawFood();

setInterval( () => {
    let head = snake.segments[0]
    if (head.x === 0 || head.x === SQUARE_DIMENSION + 1 || head.y === 0 || head.y === SQUARE_DIMENSION + 1) {
        let newText = document.getElementById("score")
        newText.innerHTML = "Game Over"
        return
    }
    if (snake.dir === "up") {
        ctx.fillStyle = "grey"
        drawSnake(true)
        moveSnakeUp()
        drawSnake(false)
    } else if (snake.dir === "right") {
        ctx.fillStyle = "grey"
        drawSnake(true)
        moveSnakeRight()
        drawSnake(false)
    } else if (snake.dir === "left") {
        ctx.fillStyle = "grey"
        drawSnake(true)
        moveSnakeLeft()
        drawSnake(false)
    } else if (snake.dir === "down") {
        ctx.fillStyle = "grey"
        drawSnake(true)
        moveSnakeDown()
        drawSnake(false)
    }

}, 100)