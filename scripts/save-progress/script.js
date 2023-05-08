// Constants
const info = [
  clicks,
  noOfClicks,
  type,
  clickersNoOfClicks,
  clickersStateGate,
  mainClickersUpgradeState,
  tenCounter,
  timerToMinigame
];
const key = 'kapogian';
const encryptedInfo = CryptoJS.AES.encrypt(JSON.stringify(info), key).toString();
let decryptedInfo = undefined;

// Functions
function downloadFile() {
  const downloadLink = document.createElement('a');
  downloadLink.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(encryptedInfo);
  downloadLink.download = 'progress.txt';
  downloadLink.style.display = 'none';

  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

function readFile(event) {
  const file = event.target.files[0];

  const reader = new FileReader();
  reader.onload = function(event) {
    const encryptedInfo = event.target.result;
    const decryptedInfo = CryptoJS.AES.decrypt(encryptedInfo, key).toString(CryptoJS.enc.Utf8);
    confirmLoadProgress(decryptedInfo);
  };
  reader.readAsText(file);
}

function confirmLoadProgress(decryptedInfo) {
  const infoArray = JSON.parse(decryptedInfo);
  const infoClicks = infoArray[0];
  const infoNoOfClicks = infoArray[1];
  if (confirm("Clicks: "+infoClicks+", Clicks per click: "+infoNoOfClicks+". Do want to load this progress?")) {
    loadProgress(decryptedInfo);
    alert('Progress has been loaded!')
    window.location.href = "index.html";
  } else {}
}

function loadProgress(decryptedInfo) {
  const infoArray = JSON.parse(decryptedInfo);
  const infoClicks = infoArray[0];
  const infoNoOfClicks = infoArray[1];
  const infoType = infoArray[2];
  const infoClickersNoOfClicks = infoArray[3];
  const infoClickersStateGate = infoArray[4];
  const infoMainClickersUpgradeState = infoArray[5];
  const infoTenCounter = infoArray[6];
  const infoTimerToMinigame = infoArray[7];
  
  clicks = infoClicks;
  noOfClicks = infoNoOfClicks;
  type = infoType;
  clickersNoOfClicks = infoClickersNoOfClicks;
  clickersStateGate = infoClickersStateGate;
  mainClickersUpgradeState = infoMainClickersUpgradeState;
  tenCounter = infoTenCounter;
  timerToMinigame = infoTimerToMinigame;
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

// Event Listiners
document.getElementById('fileInput').addEventListener('change', readFile);

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("loaderDiv").style.display = "block";
  }, 1500);
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