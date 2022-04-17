const gamePattern = [];
const userClickedPattern = [];

const buttonColours = ["red", "blue", "green", "yellow"];

const randomNumber = Math.floor(Math.random() * 4);

const nextSequence = () => {
  if (randomChosenColour === "green") {
    playSound();
  }
};

// new game, reloading page
const reloadPage = () => {
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
};

// random color from an array
const randomChosenColour = buttonColours[randomNumber];
gamePattern.push(randomChosenColour);
console.log(gamePattern);

const green = document.querySelector("#green");
const red = document.querySelector("#red");
const yellow = document.querySelector("#yellow");
const blue = document.querySelector("#blue");

// play sound on button click
function playSound(melody) {
  let path = "sounds/";
  let sound = new Audio(path + melody + ".mp3");
  sound.play();
}

// ids of button clicks pushed into array
const handler = (clicked_id) => {
  let id = clicked_id;
  userClickedPattern.push(id);
  console.log(userClickedPattern);
};

// start a new game on key press
document.body.addEventListener("keypress", keyPress);
let level = 0;

function levels() {
  document.querySelector("#level-title").innerHTML = "level 1";
}

function keyPress() {
  reloadPage();
}

window.onload = function () {
  let reloading = sessionStorage.getItem("reloading");
  if (reloading) {
    sessionStorage.removeItem("reloading");
    levels();
    nextSequence();
  }
};

function reloadP() {
  sessionStorage.setItem("reloading", "true");
  document.location.reload();
}
