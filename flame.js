
document.addEventListener("DOMContentLoaded", () => {
    const flameDiv = document.getElementById("flameEffect");
    setInterval(() => {
      flameDiv.classList.toggle("burning");
    }, 1000);
  });
  