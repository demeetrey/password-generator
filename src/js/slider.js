const rangeInput = document.getElementById("text-length");
const textInput = document.getElementById("text-length-value");

rangeInput.addEventListener("input", () => {
  textInput.value = rangeInput.value;
});

textInput.addEventListener("input", () => {
  const value = parseInt(textInput.value, 10);

  if (!isNaN(value)) {
    const clampedValue = Math.max(
      rangeInput.min,
      Math.min(rangeInput.max, value)
    );
    rangeInput.value = clampedValue;
  }
});

textInput.addEventListener("change", () => {
  let value = parseInt(textInput.value, 10);

  if (isNaN(value)) {
    value = rangeInput.min;
  }

  const clampedValue = Math.max(
    rangeInput.min,
    Math.min(rangeInput.max, value)
  );
  textInput.value = clampedValue;
  rangeInput.value = clampedValue;
});