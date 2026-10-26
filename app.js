// Prevent animation on load
setTimeout(() => {
  document.body.classList.remove("preload");
}, 500);

// DOM
const btnRules = document.querySelector(".rules-btn");
const btnClose = document.querySelector(".close-btn");
const modalRules = document.querySelector(".modal");

const CHOICES = [
  {
    name: "paper",
    beats: "rock",
  },
  {
    name: "scissors",
    beats: "paper",
  },
  {
    name: "rock",
    beats: "scissors",
  },
];
const choiceButtons = document.querySelectorAll(".choice-btn");
const gameDiv = document.querySelector(".game");
const resultsDiv = document.querySelector(".results");
const resultDivs = document.querySelectorAll(".results__result");

const resultWinner = document.querySelector(".results__winner");
const resultText = document.querySelector(".results__text");

const playAgainBtn = document.querySelector(".play-again");

const scoreNumber = document.querySelector(".score__number");
let score = 0;
let nextRoundTimer;

// Game Logic
choiceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const choiceName = button.dataset.choice;
    const choice = CHOICES.find((choice) => choice.name === choiceName);
    choose(choice);
  });
});

function choose(choice) {
  const aichoice = aiChoose();
  displayResults([choice, aichoice]);
  displayWinner([choice, aichoice]);
}

function aiChoose() {
  const rand = Math.floor(Math.random() * CHOICES.length);
  return CHOICES[rand];
}

function displayResults(results) {
  resultDivs.forEach((resultDiv, idx) => {
    const selectedChoice = results[idx];

    resultDiv.innerHTML = `
      <div class="choice ${selectedChoice.name}">
        <img src="./images/icon-${selectedChoice.name}.svg" alt="${selectedChoice.name}" />
      </div>
    `;
  });

  gameDiv.classList.add("hidden");
  resultsDiv.classList.remove("hidden");
}

function displayWinner(results) {
  setTimeout(() => {
    const userWins = isWinner(results);
    const aiWins = isWinner([results[1], results[0]]);

    if (userWins) {
      resultText.innerText = "you win";
      resultDivs[0].classList.add("winner");
      keepScore(1);
    } else if (aiWins) {
      resultText.innerText = "you lose";
      resultDivs[1].classList.add("winner");
      keepScore(-1);
    } else {
      resultText.innerText = "draw";
    }

    resultWinner.classList.remove("hidden");
    resultsDiv.classList.add("show-winner");

    // Start a new round automatically after five seconds.
    nextRoundTimer = setTimeout(resetGame, 2000);
  }, 1000);
}

function isWinner(results) {
  return results[0].beats === results[1].name;
}

function keepScore(point) {
  score += point;
  scoreNumber.innerText = score;
}

// Play Again
function resetGame() {
  clearTimeout(nextRoundTimer);

  gameDiv.classList.remove("hidden");
  resultsDiv.classList.add("hidden");

  resultDivs.forEach((resultDiv) => {
    resultDiv.innerHTML = "";
    resultDiv.classList.remove("winner");
  });

  resultText.innerText = "";
  resultWinner.classList.add("hidden");
  resultsDiv.classList.remove("show-winner");
}

playAgainBtn.addEventListener("click", resetGame);

// Show/Hide Rules
btnRules.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});
btnClose.addEventListener("click", () => {
  modalRules.classList.toggle("show-modal");
});

function handleKeyPress(event) {
  if (event.key === "Escape") {
    modalRules.classList.remove("show-modal");
  }
}

document.addEventListener("keydown", handleKeyPress);

// Close the rules modal when clicking outside its content
modalRules.addEventListener("click", (event) => {
  if (event.target === modalRules) {
    modalRules.classList.remove("show-modal");
  }
});


