// Constants
const upgradeClicks = Array.from({ length: 1000000 }, (_, i) => i * 200 );
const upgradeValues = Array.from({ length: 1000000 }, (_, i) => i);

// Elements
const clickCountElement = document.getElementById("clickCount");
const currentPerClickElement = document.getElementById("currentPerClick");
const upgradeTextElement = document.getElementById("upgradeText");

// Variables
let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let noOfClicks = parseInt(localStorage.getItem('noOfClicks')) || 1;
let type = parseInt(localStorage.getItem('type')) || 1;
let clickersNoOfClicks = parseInt(localStorage.getItem('clickersNoOfClicks')) || 5;
let clickersStateGate = parseInt(localStorage.getItem('clickersStateGate')) || 0;
let mainClickersUpgradeState = parseInt(localStorage.getItem('mainClickersUpgradeState')) || 0;
let tenCounter = parseInt(localStorage.getItem('tenCounter')) || 0;
let grandResetGate = 1;
let clickersState = 0

// Functions
function saveProgress() {
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('noOfClicks', noOfClicks);
  localStorage.setItem('type', type);
  localStorage.setItem('clickersNoOfClicks', clickersNoOfClicks);
  localStorage.setItem('clickersStateGate', clickersStateGate);
  localStorage.setItem('mainClickersUpgradeState', mainClickersUpgradeState);
  localStorage.setItem('tenCounter', tenCounter);
}

function updateUpgradeText() {
  const nextUpgradeClicks = upgradeClicks[type];
  upgradeTextElement.innerHTML = `Next upgrade: ${nextUpgradeClicks} clicks`;
}

function add() {
  clicks += noOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  saveProgress();
  const clickSound = new Audio("audio/click.mp3");
  clickSound.play();
  if (clickersStateGate === 1) {
    clickersState = 1;
  }
}

function clickersAdd() {
  clicks += clickersNoOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  saveProgress();
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
    saveProgress();
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
  saveProgress();
}


function clickersUpgrade() {
  clickersNoOfClicks += 5;
}

function grandReset () {
  if (grandResetGate === 1 && !localStorage.getItem('hasCleared')) {
    alert('I am sorry but its the grand reset... All of your porgress have been lost, but in our hearts it has not. Think of this as a new chapter, where you leveled up.');
    clicks = 0;
    noOfClicks = 1;
    type = 1;
    clickersNoOfClicks = 5;
    clickersStateGate = 0;
    mainClickersUpgradeState = 0;
    tenCounter = 0;
    localStorage.clear();
    localStorage.setItem('hasCleared', true);
    updateUpgradeText();
    clickCountElement.innerHTML = `Clicks: ${clicks}`;
    currentPerClickElement.innerHTML = `${noOfClicks} per click`;
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

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    grandReset();
    init();
    const clickSound = new Audio("audio/click.mp3");
    const upgradeSound = new Audio("audio/upgrade.mp3");
  }, 3000);
});