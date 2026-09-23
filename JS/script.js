const board = document.getElementById("game-board");
const movesDisplay = document.getElementById("moves");
const timerDisplay = document.getElementById("timer");
const resultDisplay = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

let dimension = 150;
let imgStart = Math.floor(Math.random() * 100) + 1;

let images = [];
let cards = [];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

let moves = 0;
let matchedCount = 0;
let seconds = 0;
let timerInterval = null;

for (let i = imgStart; i < imgStart + 8; i++) {
  images.push(
    `https://picsum.photos/seed/${i}/${dimension}/${dimension}`
  );
}

cards = [...images, ...images];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initGame() {
  clearInterval(timerInterval);

  board.innerHTML = "";
  resultDisplay.textContent = "";

  moves = 0;
  matchedCount = 0;
  seconds = 0;

  firstCard = null;
  secondCard = null;
  lockBoard = false;

  movesDisplay.textContent = moves;
  timerDisplay.textContent = formatTime(seconds);

  shuffle(cards);

  cards.forEach(imgUrl => {
    const card = document.createElement("div");

    card.classList.add("card");
    card.dataset.value = imgUrl;

    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "Carte cachée");

    card.addEventListener("click", () => handleCardClick(card));

    board.appendChild(card);
  });

  startTimer();
}

function handleCardClick(card) {
  if (
    lockBoard ||
    card.classList.contains("matched") ||
    card === firstCard ||
    card.firstChild
  ) {
    return;
  }

  revealCard(card);

  if (!firstCard) {
    firstCard = card;
    return;
  }

  secondCard = card;
  lockBoard = true;

  moves++;
  movesDisplay.textContent = moves;

  checkMatch();
}

function revealCard(card) {
  const img = document.createElement("img");

  img.src = card.dataset.value;
  img.alt = "Image de mémoire";

  card.appendChild(img);
}

function checkMatch() {
  if (firstCard.dataset.value === secondCard.dataset.value) {
    firstCard.classList.add("matched");
    secondCard.classList.add("matched");

    matchedCount += 2;

    resetTurn();
    checkVictory();
  } else {
    setTimeout(() => {
      firstCard.innerHTML = "";
      secondCard.innerHTML = "";

      resetTurn();
    }, 800);
  }
}

function resetTurn() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function formatTime(sec) {
  const min = String(Math.floor(sec / 60)).padStart(2, "0");
  const seconds = String(sec % 60).padStart(2, "0");

  return `${min}:${seconds}`;
}

function startTimer() {
  timerInterval = setInterval(() => {
    seconds++;
    timerDisplay.textContent = formatTime(seconds);
  }, 1000);
}

function stopTimer() {
  clearInterval(timerInterval);
}

function checkVictory() {
  if (matchedCount === cards.length) {
    stopTimer();

    resultDisplay.textContent =
      `Victoire ! Coups : ${moves} | Temps : ${formatTime(seconds)}`;
  }
}

restartButton.addEventListener("click", initGame);

initGame();