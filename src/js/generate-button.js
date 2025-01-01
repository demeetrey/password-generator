document
  .querySelector(".generate-button")
  .addEventListener("click", function () {
    const svg = this.querySelector("#generate-svg");
    svg.classList.toggle("rotate");
    setTimeout(() => {
      svg.classList.toggle("rotate");
    }, 300);
  });