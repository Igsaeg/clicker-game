//loader

let timer;

function loader() {
  timer = setTimeout(showPage, 5000);
}

function showPage() {
  document.getElementById("loader").style.display = "none";
  document.getElementById("loaderDiv").style.display = "block";
}

//main game

let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let noOfClicks = parseInt(localStorage.getItem('noOfClicks')) || 1;
let type = parseInt(localStorage.getItem('type')) || 1;

const upgradeClicks = [0, 200, 500, 1000, 1500, 2000, 2500, 3000];
const upgradeValues = [0, 1, 2, 5, 10, 15, 20, 25, 30];

const clickCountElement = document.getElementById("clickcount");
const currentPerClickElement = document.getElementById("current-per-click");
const upgradeTextElement = document.getElementById("upgrade-text");
const clickerElement = document.getElementById("clicker");
const upgradeElement = document.getElementById("upgrade");

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
  }
}

updateUpgradeText();
clickCountElement.innerHTML = `Clicks: ${clicks}`;
currentPerClickElement.innerHTML = `${noOfClicks} per click`;

clickerElement.addEventListener("click", add);
upgradeElement.addEventListener("click", upgrade);