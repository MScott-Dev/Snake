const playBoard = document.querySelector('.play-board');

let foodX, foodY;
let snakeX = 5, snakeY = 10;
let snakeBody = [];
let velocityX = 0, velocityY = 0;
let gameOver = false;
let setIntervalId;

// Randomly picks a grid area to put the food
const changeFoodLocation = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
}

// Clears interval and reloads page to reset
const handleGameOver = () => {
    clearInterval(setIntervalId);
    alert('Game Over! Press OK to replay!');
    location.reload();
}

// Changes directions based on key pressed 
const changeDirection = (e) => {
    if(e.key === 'ArrowUp' && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    } else if(e.key === 'ArrowDown' && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    } else if(e.key === 'ArrowLeft' && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    } else if(e.key === 'ArrowRight' && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}

// Starts the game. Places the head and randomly picks food location
const initGame = () => {

    if(gameOver) return handleGameOver();

    let htmlMarkup = `<section class="food" style="grid-area: ${foodY} / ${foodX}"></section>`;

    // checks if head hits food and adds to length
    if(snakeX === foodX && snakeY === foodY) {
        changeFoodLocation();
        snakeBody.push([foodX, foodY]);
    }


    for (i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i -1];
    }

    // Settting the first snake part
    snakeBody[0] = [snakeX, snakeY];

    // updates the snake's head
    snakeX += velocityX;
    snakeY += velocityY;

    for (let i = 0; i < snakeBody.length; i++) {
        // adds section for each body part
        htmlMarkup += `<section class="snakeHead" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></section>`;
        // checks if snakebody touches itself if so game over
        if(i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) {
            gameOver = true;
        }
    }

    // checks if snake touches wall if so then changes gameOver to true
    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

   
    playBoard.innerHTML = htmlMarkup;
};




changeFoodLocation();
// Moves the head every 125ms 
setIntervalId = setInterval(initGame, 125);

document.addEventListener('keydown', changeDirection);