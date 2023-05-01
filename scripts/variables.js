// Variables
let clicks = parseInt(localStorage.getItem('clicks')) || 0;
let noOfClicks = parseInt(localStorage.getItem('noOfClicks')) || 1;
let type = parseInt(localStorage.getItem('type')) || 1;
let clickersNoOfClicks = parseInt(localStorage.getItem('clickersNoOfClicks')) || 5;
let clickersStateGate = parseInt(localStorage.getItem('clickersStateGate')) || 0;
let mainClickersUpgradeState = parseInt(localStorage.getItem('mainClickersUpgradeState')) || 0;
let tenCounter = parseInt(localStorage.getItem('tenCounter')) || 0;
let timerToMinigame = parseInt(localStorage.getItem('timerToMinigame')) || 1200;
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
  localStorage.setItem('timerToMinigame', timerToMinigame);
}
setInterval(saveProgress, 0)