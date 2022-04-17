let sequence = [];
let humanSequence = [];

// start a new game o any keypress
document.body.addEventListener("keypress", keyPress);

function handleClick(tile) {
  const index = humanSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  if (humanSequence[index] !== sequence[index]) {
    resetGame("Oops! Game over, you pressed the wrong tile");
    return;
  }

  if (humanSequence.length === sequence.length) {
    if (humanSequence.length === 20) {
      resetGame("Congrats! You completed all the levels");
      return;
    }
    humanSequence = [];
    setTimeout(() => {
      nextRound();
    }, 500);
    return;
  }
}

// document.body.addEventListener("keypress", keyPress);

function keyPress() {
  document.querySelector("#level-title").innerHTML = "level 1";
  nextRound();
}

// start the next round
let level = 0;

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add("activated");
  sound.play();

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function nextStep() {
  const tiles = ["red", "green", "blue", "yellow"];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add("unclickable");
  heading.textContent = `Level ${level}`;

  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 300 + 300);
}

// human turn

const heading = document.querySelector("#level-title");
const tileContainer = document.querySelector(".container");

function resetGame(text) {
  alert(text);
  sequence = [];
  humanSequence = [];
  level = 0;
  heading.textContent = "Press any Key to Start";
  tileContainer.classList.add("unclickable");
}

function humanTurn(level) {
  tileContainer.classList.remove("unclickable");
}

tileContainer.addEventListener("click", (event) => {
  const { tile } = event.target.dataset;

  if (tile) handleClick(tile);
});
