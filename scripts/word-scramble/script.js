// Elements
const scrambledTextElement = document.getElementById("scrambledText");
const userInputElement = document.getElementById("input");
const hintTextElement = document.getElementById("hintText");
const scoreTextElement = document.getElementById("scoreText");

// Variables
let wordPicker;
let noOfTries = 5;
let noOfCorrects = 0;
let clicksAdded = 0;
let clicksAddedGate = 1;

// Functions
function saveProgress() {
  localStorage.setItem('clicks', clicks);
}
setInterval(saveProgress, 0)

function initGame() {
  wordPicker = words[Math.floor(Math.random() * words.length)];
  let wordArray = wordPicker.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  scrambledTextElement.innerText = wordArray.join(" ").toUpperCase();
  hintTextElement.innerText = wordPicker.hint;
}

function checkWord() {
  const userInput = userInputElement.value.toUpperCase();
  const correctWord = wordPicker.word.toUpperCase();
  if (userInput === correctWord) {
    alert('Congrats! ' + userInput + ' is correct')
    userInputElement.value = "";
    wordCorrect();
  }
  else {
    alert('Sorry, ' + userInput + ' is wrong')
    userInputElement.value = "";
    wordWrong();
  }
  
}

function updateScoreText() {
  scoreTextElement.innerHTML = `${noOfCorrects}/5 correct - ${noOfTries} tries remaining`;
}

function wordCorrect() {
  noOfCorrects++;
  clicksAdded += 1000;
  noOfTries--;
  if (noOfTries === 0) {
    updateScoreText();
    revealScore();
  } 
  else {
    initGame();
    updateScoreText();
  }
}

function wordWrong() {
  noOfTries--;
  if (noOfTries === 0) {
    updateScoreText();
    revealScore();
  } 
  else {
    initGame();
    updateScoreText();
  }
}

function refreshWord() {
  userInputElement.value = "";
  noOfTries--;
  if (noOfTries === 0) {
    updateScoreText();
    revealScore();
  } 
  else {
    initGame();
    updateScoreText();
  }
}

function revealScore() {
  localStorage.setItem('clicksAdded', clicksAdded);
  localStorage.setItem('clicksAddedGate', clicksAddedGate);
  if (noOfCorrects === 5) {
    alert('Perfect! You got all of them right. Clicks added ' + clicksAdded)
  }
  else if (noOfCorrects === 4) {
    alert('Barely! Almost perfect. Clicks added ' + clicksAdded)
  }
  else if (noOfCorrects === 3) {
    alert('Good job! You got three right. Clicks added ' + clicksAdded)
  }
  else if (noOfCorrects === 2) {
    alert('Not bad! You got two right. Clicks added ' + clicksAdded)
  }
  else if (noOfCorrects === 1) {
    alert('Better luck next time! You got one right. Clicks added ' + clicksAdded)
  }
  else {
    alert('Sorry! You got none right... Clicks added ' + clicksAdded)
  }  
  countdownToBack()
}

function countdownToBack() {
  let timerToBack = 1;
  setInterval(() => {
    timerToBack--;
    if (timerToBack === 0) {
      backToGame()
    }
  }, 1000)
}

function backToGame() {
  window.location.href = "index.html";
}

// Event Listiners
userInputElement.addEventListener('keydown', event => {
  if (event.key === 'Enter') {
    checkWord();
  }
});

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  let timerToMinigame = parseInt(localStorage.getItem('timerToMinigame'));
  if (timerToMinigame === 0) {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loaderDiv").style.display = "block";
      initGame()
    }, 2500)
  }
  else {
    backToGame();
  }
});