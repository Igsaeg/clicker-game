// Constants
const upgradeClicks = Array.from({ length: 1000000 }, (_, i) => i * 200);
const upgradeValues = Array.from({ length: 1000000 }, (_, i) => i);

// Elements
const clickCountElement = document.getElementById("clickcount");
const currentPerClickElement = document.getElementById("current-per-click");
const upgradeTextElement = document.getElementById("upgrade-text");
const clickerElement = document.getElementById("clicker");
const upgradeElement = document.getElementById("upgrade");

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



function playAudio() {
  var bgSound = new Audio('../../audio/background.mp3');
  bgSound.loop = true;
	bgSound.play();
}

function add() {
  clicks += noOfClicks;
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  saveProgress();
  const clickSound = new Audio("audio/click.mp3");
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
    const upgradeSound = new Audio("audio/upgrade.mp3");
    upgradeSound.play();
  }
}

function init() {
  updateUpgradeText();
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  currentPerClickElement.innerHTML = `${noOfClicks} per click`;
}

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    init();
  }, 3000);
});
