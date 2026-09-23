const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let images = [];
let cards = [];

for (let i = imgStart; i < imgStart + 8; i++) {
    images.push(`https://picsum.photos/seed/${i}/${dimension}/${dimension}`);
}

cards = [...images, ...images];

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function initGame() {
    shuffle(cards);
    board.innerHTML = "";

    cards.forEach(imgURL => {
        const card = document.createElement("div");

        card.classList.add("card");
        card.dataset.image = imgURL;
        card.setAttribute("role", "button");
        card.setAttribute("tabindex", "0");

        board.appendChild(card);
    });
}

initGame();