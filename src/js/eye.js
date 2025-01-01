const openButtonContainer = document.querySelector(".eye-open-button-container");
const closeButtonContainer = document.querySelector(".eye-close-button-container");

let symbolQuantity,
  starQuantity = "";

function resizeHiddenPassword() {
  const passwordContentStyles = window.getComputedStyle(passwordContent);

  hiddenPassword.style.width = passwordContentStyles.width;
  // hiddenPassword.style.height = passwordContentStyles.height;
  // hiddenPassword.style.height = "40" + "px";

  hiddenPassword.style.left = passwordContent.offsetLeft + "px";
  //hiddenPassword.style.top = passwordContent.offsetTop + "px";

  hiddenPassword.style.width = parseInt(hiddenPassword.style.width) + "px";
  let fontSize = 32;
  hiddenPassword.style.fontSize = fontSize + "px";

  const maxWidth = hiddenPassword.offsetWidth;

  while (hiddenPassword.scrollWidth >= maxWidth && fontSize > 3) {
    fontSize -= 1;
    hiddenPassword.style.fontSize = fontSize + "px";
  }
}

rangeInput.addEventListener("input", () => {
  symbolQuantity = rangeInput.value;
});

let animationTimeout;

function animateHidden(textContent) {
  hiddenPassword.textContent = "";

  let a = 0;

  if (animationTimeout) {
    clearTimeout(animationTimeout);
    animationTimeout = null;
  }

  function addCharacter(speed) {
    if (a < textContent.length) {
      hiddenPassword.textContent += textContent[a];
      a++;
      if (a < textContent.length) {
        hiddenPassword.textContent += textContent[a];
        a++;
      }
      animationTimeout = setTimeout(() => {
        addCharacter(speed);
      }, speed);
    } else {
      animationTimeout = null;
    }
  }

  if (textContent.length >= 8 && textContent.length <= 12) {
    addCharacter(40);
  } else if (textContent.length > 12 && textContent.length <= 16) {
    addCharacter(30);
  } else if (textContent.length > 16 && textContent.length <= 32) {
    addCharacter(20);
  } else {
    addCharacter(10);
  }
}

openButtonContainer.addEventListener("click", () => {
  resizeHiddenPassword();

  const starQuantity = "●".repeat(rangeInput.value);

  hiddenPassword.classList.add("visible");
  passwordContent.style.visibility = "hidden";

  animateHidden(starQuantity);

  openButtonContainer.style.display = "none";
  closeButtonContainer.style.display = "block";
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const starQuantity = "●".repeat(rangeInput.value);
    animateHidden(starQuantity);
  });
});

closeButtonContainer.addEventListener("click", () => {
  hiddenPassword.classList.remove("visible");
  passwordContent.style.visibility = "visible";
  closeButtonContainer.style.display = "none";
  openButtonContainer.style.display = "block";
});

window.addEventListener("resize", resizeHiddenPassword);
slider.addEventListener("input", resizeHiddenPassword);

const checkboxes = [
  checkboxLower,
  checkboxUpper,
  checkboxNumbers,
  checkboxSpecial,
  checkboxSmart,
  checkbox_i_l,
  checkbox_O_0,
  checkboxQuote,
  reGenerateButton,
];

checkboxes.forEach((click) => {
  click.addEventListener("click", () => {
    resizeHiddenPassword();
    const starQuantity = "●".repeat(rangeInput.value);
    animateHidden(starQuantity);
  });
});