// Functions
function backToGame() {
  window.location.href = "index.html";
}

function anchorDown() {
  document.querySelector("#down").scrollIntoView({behavior: "smooth"});
}

function anchorUp() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
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
    initMinigameTimer();
  }, 1500);
});