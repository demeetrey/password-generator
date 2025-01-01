const copyButton = document.querySelector(".copy-button");
const tooltip = document.getElementById("copy-tooltip");
const passwordContent = document.getElementById("password-id");
const passwordContainer = document.querySelector(".password-container");

function resizeTooltip() {
  const passwordContentStyles = window.getComputedStyle(passwordContent);

  tooltip.style.width = passwordContentStyles.width;
  tooltip.style.height = passwordContentStyles.height;

  tooltip.style.left = passwordContent.offsetLeft + "px";
  tooltip.style.top = passwordContent.offsetTop + "px";

  tooltip.style.width = parseInt(tooltip.style.width) + "px";
  let fontSize = 24;
  tooltip.style.fontSize = fontSize + "px";

  const maxWidth = tooltip.offsetWidth;

  while (tooltip.scrollWidth >= maxWidth && fontSize > 3) {
    fontSize -= 1;
    tooltip.style.fontSize = fontSize + "px";
  }
}

function animateText(textContent) {
  tooltip.textContent = "";
  let a = 0;

  function addCharacter() {
    if (a < textContent.length) {
      tooltip.textContent += textContent[a];
      a++;
      setTimeout(addCharacter, 20);
    }
  }
  addCharacter();
}

let to = 0;
copyButton.addEventListener("click", function () {
  passwordContainer.style.borderColor = "#14e025";

  if (to) {
    return;
  }
  resizeTooltip();

  tooltip.classList.add("visible");

  if (passwordContent.style.visibility !== "hidden") {
    passwordContent.style.visibility = "hidden";
  }

  animateText(tooltip.textContent);

  to = setTimeout(() => {
    tooltip.classList.remove("visible");
    passwordContainer.style.borderColor = "#bb9a6a";
    passwordContainer.style.boxShadow = "none";
    if (closeButtonContainer.style.display === "none") {
      passwordContent.style.visibility = "visible";
    }
    clearTimeout(to);
    to = 0;
  }, 1500);
});

copyButton.addEventListener("click", () => {
  const textToCopy = passwordContent.textContent;
  navigator.clipboard.writeText(textToCopy);
});

window.addEventListener("resize", resizeTooltip);