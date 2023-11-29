const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let velocityX = 0, velocityY = 0;

// Randomly picks a grid area to put the food
const changeFoodLocation = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Changes directions based on key pressed 
const changeDirection = (e) => {
    if(e.key === 'ArrowUp') {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === 'ArrowDown') {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === 'ArrowLeft') {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === 'ArrowRight') {
        velocityX = 1;
        velocityY = 0;
    }
}

// Starts the game. Places the head and randomly picks food location
const initGame = () => {
    let htmlMarkup = `<section class="food" style="grid-area: ${foodY} / ${foodX}"></section>`;

    // updates the snake's head
    snakeX += velocityX;
    snakeY += velocityY;

    htmlMarkup += `<section class="snakeHead" style="grid-area: ${snakeY} / ${snakeX}"></section>`;
    playBoard.innerHTML = htmlMarkup;
};




changeFoodLocation();
// Moves the head every 125ms 
setInterval(initGame, 125);

document.addEventListener('keydown', changeDirection);