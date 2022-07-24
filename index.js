let scoreBlock;
let score = 0;

const config = {
    step: 0,
    maxStep: 6,
    sizeCell: 16,
    sizeCake: 16 / 4
}

const snake = {
    x: 160,
    y: 160,
    dx: config.sizeCell,
    dy: 0,
    tails: [],
    maxTails: 1
}

let Cake = {
    x: 0,
    y: 0
}


let canvas = document.querySelector("#game");
let context = canvas.getContext("2d");
scoreBlock = document.querySelector(".score .scoreCount");
drawScore();

function gameLoop() {

    requestAnimationFrame( gameLoop );
    if ( ++config.step < config.maxStep) {
        return;
    }
    config.step = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);

    drawCake();
    drawSnake();
}
requestAnimationFrame( gameLoop );

function drawSnake() {
    snake.x += snake.dx;
    snake.y += snake.dy;

    collisionBorder();

    snake.tails.unshift( { x: snake.x, y: snake.y } );

    if ( snake.tails.length > snake.maxTails ) {
        snake.tails.pop();
    }

    snake.tails.forEach( function(el, index){
        if (index == 0) {
            context.fillStyle = "#377904";
        } else {
            context.fillStyle = "#59c406";
        }
        context.fillRect( el.x, el.y, config.sizeCell, config.sizeCell );

        if ( el.x === Cake.x && el.y === Cake.y ) {
            snake.maxTails++;
            incScore();
            randomPositionCake();
        }

        for( let i = index + 1; i < snake.tails.length; i++ ) {

            if ( el.x == snake.tails[i].x && el.y == snake.tails[i].y ) {
                refreshGame();
            }

        }

    } );
}

function collisionBorder() {
    if (snake.x < 0) {
        snake.x = canvas.width - config.sizeCell;
    } else if ( snake.x >= canvas.width ) {
        snake.x = 0;
    }

    if (snake.y < 0) {
        snake.y = canvas.height - config.sizeCell;
    } else if ( snake.y >= canvas.height ) {
        snake.y = 0;
    }
}
function refreshGame() {
    score = 0;
    drawScore();

    snake.x = 160;
    snake.y = 160;
    snake.tails = [];
    snake.maxTails = 1;
    snake.dx = config.sizeCell;
    snake.dy = 0;

    randomPositionCake();
}

function drawCake() {
    context.beginPath();
    context.fillStyle = "#59c406";
    context.arc( Cake.x + (config.sizeCell / 2 ), Cake.y + (config.sizeCell / 2 ), config.sizeCake, 0, 2 * Math.PI );
    context.fill();
}

function randomPositionCake() {
    Cake.x = getRandomInt( 0, canvas.width / config.sizeCell ) * config.sizeCell;
    Cake.y = getRandomInt( 0, canvas.height / config.sizeCell ) * config.sizeCell;
}

function incScore() {
    score++;
    drawScore();
}

function drawScore() {
    scoreBlock.innerHTML = score;
}

function getRandomInt(min, max) {
    return Math.floor( Math.random() * (max - min) + min );
}

document.addEventListener("keydown", function (e) {
    if ( e.code == "KeyW" ) {
        snake.dy = -config.sizeCell;
        snake.dx = 0;
    } else if ( e.code == "KeyA" ) {
        snake.dx = -config.sizeCell;
        snake.dy = 0;
    } else if ( e.code == "KeyS" ) {
        snake.dy = config.sizeCell;
        snake.dx = 0;
    } else if ( e.code == "KeyD" ) {
        snake.dx = config.sizeCell;
        snake.dy = 0;
    }
});