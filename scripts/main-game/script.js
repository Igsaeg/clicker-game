// Constants
const upgradeClicks = Array.from({ length: 1000000 }, (_, i) => i * 200 );
const upgradeValues = Array.from({ length: 1000000 }, (_, i) => i);

// Elements
const clickCountElement = document.getElementById("clickCount");
const currentPerClickElement = document.getElementById("currentPerClick");
const upgradeTextElement = document.getElementById("upgradeText");

// Functions
function updateUpgradeText() {
  const nextUpgradeClicks = upgradeClicks[type];
  upgradeTextElement.innerHTML = `Next upgrade: ${nextUpgradeClicks} clicks`;
}

function add() {
  clicks += noOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  const clickSound = new Audio("audio/click.mp3");
  clickSound.play();
  if (clickersStateGate === 1) {
    clickersState = 1;
  }
}

function clickersAdd() {
  clicks += clickersNoOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  const clickSound = new Audio("audio/click.mp3");
  clickSound.play();
}

function clickers() {
  if (clickersState === 1) {
    clickersAdd(); 
  }
}

setInterval(clickers, 1000);

function upgrade() {
  const nextUpgradeClicks = upgradeClicks[type];
  if (clicks >= nextUpgradeClicks) {
    type++;
    clicks -= nextUpgradeClicks;
    noOfClicks = upgradeValues[type];
    clickCountElement.innerHTML = `Clicks: ${clicks}`;
    currentPerClickElement.innerHTML = `${noOfClicks} per click`;
    updateUpgradeText();
    clickersUpgradeChecker();
    const upgradeSound = new Audio("audio/upgrade.mp3");
    upgradeSound.play();
  }
}

function clickersUpgradeChecker() {
  if (type === 10) {
    clickersState = 1;
    clickersStateGate = 1;
    mainClickersUpgradeState = 1;
    alert('Clickers have been added!')
  }
  if (mainClickersUpgradeState === 1) {
    if (tenCounter === 10) {
      clickersUpgrade();
      tenCounter = 0;
    }
  tenCounter++;
  }
}


function clickersUpgrade() {
  clickersNoOfClicks += 5;
}

function addClicks() {
  let clicksAdded = parseInt(localStorage.getItem('clicksAdded'));
  let clicksAddedGate = parseInt(localStorage.getItem('clicksAddedGate'));
  if (clicksAddedGate === 1) {
    clicks += clicksAdded;
    clickCountElement.innerHTML = `Clicks: ${clicks}`;
    localStorage.setItem('clicksAdded', 0);
    localStorage.setItem('clicksAddedGate', 0);
  }
}

function init() {
  updateUpgradeText();
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  currentPerClickElement.innerHTML = `${noOfClicks} per click`;
  if (clickersStateGate === 1) {
    alert('Reminder! Clickers wont start automatically. Press the click button to reactivate it!')
  }
}

function initMinigameTimer() {
  setInterval(() => {
    timerToMinigame--;
    if (timerToMinigame === 0) {
      window.location.href = "word-scramble.html";
    }
  }, 1000)
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    init();
    initMinigameTimer();
    addClicks();
    const clickSound = new Audio("audio/click.mp3");
    const upgradeSound = new Audio("audio/upgrade.mp3");
  }, 3000);
});