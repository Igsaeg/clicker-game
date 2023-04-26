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

// Initialization
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
      document.getElementById("loader").style.display = "none";
      document.getElementById("loaderDiv").style.display = "block";
    }, 1500);
  });