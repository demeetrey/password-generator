const hiddenPassword = document.getElementById("hidden-password-id");
const slider = document.getElementById("text-length");
const sliderValue = document.getElementById("text-length-value");
const sizeButtons = document.querySelectorAll(".password-lenght-button");

function resizeText() {
  const textLength = parseInt(slider.value, 10);
  sliderValue.value = textLength;

  passwordContent.textContent = randomSymbolGenerator();

  const starText = "●".repeat(textLength);
  hiddenPassword.textContent = starText;

  let fontSize = 32;
  passwordContent.style.fontSize = fontSize + "px";
  hiddenPassword.style.fontSize = fontSize + "px";

  let s1 = 32;
  for (let i = 24; i <= 32; i++, s1 -= 1) {
    if (textLength == i) {
      s1 -= 1;
      passwordContent.style.fontSize = s1 + "px";
    }
  }
  let s2 = 24;
  for (let i = 32; i <= 64; i++) {
    if (textLength == i) {
      passwordContent.style.fontSize = s2 + "px";
    }
  }
}

slider.addEventListener("input", resizeText);

sliderValue.addEventListener("input", () => {
  const value = parseInt(sliderValue.value, 1);

  if (!isNaN(value)) {
    const clampedValue = Math.max(slider.min, Math.min(slider.max, value));
    slider.value = clampedValue;
    resizeText();
  }
});

sliderValue.addEventListener("change", () => {
  let value = parseInt(sliderValue.value, 10);

  if (isNaN(value)) {
    value = slider.min;
  }

  const clampedValue = Math.max(slider.min, Math.min(slider.max, value));
  sliderValue.value = clampedValue;
  slider.value = clampedValue;
  resizeText();
  resizeHiddenPassword();
});

sizeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    sliderValue.value = button.innerText;
    slider.value = button.innerText;
    resizeText();
    resizeHiddenPassword();
  });
});

resizeText();

const checkboxesArray = [
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

checkboxesArray.forEach((click) => {
  click.addEventListener("click", () => {
    resizeText();
  });
});