const playBoard = document.querySelector('.play-board');

let foodX = 13, foodY = 10;

const initGame = () => {
    let htmlMarkup = `<section class="food" style="grid-area: ${foodY} / ${foodX}"></section>`;
    playBoard.innerHTML = htmlMarkup;
};

initGame();