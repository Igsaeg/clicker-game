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

// Functions
function saveProgress() {
  localStorage.setItem('clicks', clicks);
  localStorage.setItem('noOfClicks', noOfClicks);
  localStorage.setItem('type', type);
}

function updateUpgradeText() {
  const nextUpgradeClicks = upgradeClicks[type];
  upgradeTextElement.innerHTML = `Next upgrade: ${nextUpgradeClicks} clicks`;
}

function add() {
  clicks += noOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  saveProgress();
  const clickSound = new Audio("../../audio/click.mp3");
  clickSound.play();
}

function upgrade() {
  const nextUpgradeClicks = upgradeClicks[type];
  if (clicks >= nextUpgradeClicks) {
    type++;
    clicks -= nextUpgradeClicks;
    noOfClicks = upgradeValues[type];
    currentPerClickElement.innerHTML = `${noOfClicks} per click`;
    saveProgress();
    updateUpgradeText();
    clickCountElement.innerHTML = `Clicks: ${clicks}`;
    const upgradeSound = new Audio("../../audio/upgrade.mp3");
    upgradeSound.play();
  }
}

function init() {
  updateUpgradeText();
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  currentPerClickElement.innerHTML = `${noOfClicks} per click`;
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    init();
    const clickSound = new Audio("../../audio/click.mp3");
    const upgradeSound = new Audio("../../audio/upgrade.mp3");
  }, 3000);
});