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
    localStorage.clear();
  }
}

function init() {
  updateUpgradeText();
  clickCountElement.innerHTML = `Clicks: ${clicks}`;
  currentPerClickElement.innerHTML = `${noOfClicks} per click`;
  initMinigameTimer();
  addClicks();
}

function initMinigameTimer() {
  let timerId = setInterval(() => {
    if (timerToMinigame >= 2) {
      timerToMinigame--;
    } else {
      clearInterval(timerId);
      if (confirm("Its time for a minigame! Do you wish to proceed")) {
        window.location.href = "word-scramble.html";
      } else {
        timerToMinigame = 901;
        initMinigameTimer();
      }
    }
  }, 1000);
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
    init();
  }, 3000);
});

// Navigation
function navLogic() {
  if (navGate === 0) {
    document.getElementById("sidenav").style.width = "250px";
    navGate = 1;
  } else {
    document.getElementById("sidenav").style.width = "0";
    navGate = 0;
  }
}