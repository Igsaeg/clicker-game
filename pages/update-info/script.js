// Functions
function backToGame() {
  window.location.href = "index.html";
}

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loaderDiv").style.display = "block";
    }, 1500);
  });