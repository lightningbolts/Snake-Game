const SQUARE_DIMENSION = 20;
const SNAKE_COLOR = "blue";
let boardColor = "grey";
let score = 0;

let canvasElement = document.getElementById("canvas");
let ctx = canvasElement.getContext("2d");

canvasElement.width = 800;
canvasElement.height = 800;

let cellWidth = canvasElement.width / SQUARE_DIMENSION;
let cellHeight = canvasElement.height / SQUARE_DIMENSION;

ctx.fillStyle = "pink";

function onColorChange(value) {
    boardColor = value
    initializeGame()
}

function drawSnakeSegment(x, y) {
    ctx.fillRect(x, y, cellWidth, cellHeight);
    ctx.strokeRect(x, y, cellWidth, cellHeight);
}
function drawBoard() {
    ctx.fillStyle = boardColor
    for (let rows = 0; rows < SQUARE_DIMENSION; rows++) {
        for (let columns = 0; columns < SQUARE_DIMENSION; columns++) {
            drawSnakeSegment(rows * cellWidth, columns * cellHeight)
        }
    }
}
let snake = undefined

let food = {
    x: undefined,
    y: undefined
}

function resetSnake() {
    snake = {
        x: 8,
        y: 8,
        dir: "up",
        length: 2,
        segments: [{ x: SQUARE_DIMENSION / 2, y: SQUARE_DIMENSION / 2 }]
    }
    for (let snakeSegment = 0; snakeSegment < snake.length; snakeSegment++) {
        snake.segments.push({ x: SQUARE_DIMENSION / 2, y: SQUARE_DIMENSION / 2 + 1 + snakeSegment });
    }
}

function drawFood() {
    ctx.fillStyle = "yellow"
    drawSnakeSegment(food.x * cellWidth, food.y * cellHeight)
}

function moveSnakeUp() {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x, y: head.y - 1 })
}

function moveSnakeRight() {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x + 1, y: head.y })
}

function moveSnakeLeft() {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x - 1, y: head.y })
}

function moveSnakeDown() {
    let head = snake.segments[0]
    snake.segments.pop()
    snake.segments.unshift({ x: head.x, y: head.y + 1 })
}

function growSnake() {
    let head = snake.segments[0]
    if (snake.dir === "up") {
        snake.segments.unshift({ x: head.x, y: head.y - 1 })
    } else if (snake.dir === "right") {
        snake.segments.unshift({ x: head.x + 1, y: head.y })
    } else if (snake.dir === "left") {
        snake.segments.unshift({ x: head.x - 1, y: head.y })
    } else if (snake.dir === "down") {
        snake.segments.unshift({ x: head.x, y: head.y + 1 })
    }
}

function isFoodInSnake() {
    return snake.segments.some((segment) => {
        return food.x === segment.x && food.y === segment.y
    })
}

function drawSnake(reset) {
    ctx.fillStyle = SNAKE_COLOR;
    let head = snake.segments[0]
    if (head.x === food.x && head.y === food.y) {
        growSnake()
        while (isFoodInSnake()) {
            updateFoodPosition();
            console.log(food)
        }
        drawFood()
        score = score + 1
    }
    for (let segmentIndex = 0; segmentIndex < snake.segments.length; segmentIndex++) {
        if (segmentIndex === 0) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = SNAKE_COLOR
        }
        if (reset) {
            ctx.fillStyle = boardColor
        }
        drawSnakeSegment(snake.segments[segmentIndex].x * cellWidth, snake.segments[segmentIndex].y * cellHeight)
    }
}

function updateFoodPosition() {
    food.x = Math.floor(Math.random() * (SQUARE_DIMENSION - 2) + 1);
    food.y = Math.floor(Math.random() * (SQUARE_DIMENSION - 2) + 1);
}

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
function initializeGame() {
    drawBoard();
    resetSnake()
    drawSnake(false);
    updateFoodPosition()
    drawFood()
    document.addEventListener('keydown', handleKeyDown);
}

initializeGame()

function startButton() {
    initializeGame()
    let repeater = setInterval(() => {
        let head = snake.segments[0]
        if (head.x === 0 || head.x === SQUARE_DIMENSION - 1 || head.y === 0 || head.y === SQUARE_DIMENSION - 1) {
            let newText = document.getElementById("score")
            newText.innerHTML = "Game Over -- Score: " + score
            clearInterval(repeater)
            return
        }
        if (snake.dir === "up") {
            ctx.fillStyle = boardColor
            drawSnake(true)
            moveSnakeUp()
            drawSnake(false)
        } else if (snake.dir === "right") {
            ctx.fillStyle = boardColor
            drawSnake(true)
            moveSnakeRight()
            drawSnake(false)
        } else if (snake.dir === "left") {
            ctx.fillStyle = boardColor
            drawSnake(true)
            moveSnakeLeft()
            drawSnake(false)
        } else if (snake.dir === "down") {
            ctx.fillStyle = boardColor
            drawSnake(true)
            moveSnakeDown()
            drawSnake(false)
        }

    }, 100)
}