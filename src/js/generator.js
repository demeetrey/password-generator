const reGenerateButton = document.getElementById("generate-svg");
const checkboxLower = document.getElementById("checkbox-lower");
const checkboxUpper = document.getElementById("checkbox-upper");
const checkboxNumbers = document.getElementById("checkbox-numbers");
const checkboxSpecial = document.getElementById("checkbox-special");
const checkboxSmart = document.getElementById("checkbox-smart");
const checkbox_i_l = document.getElementById("checkbox-i-l");
const checkbox_O_0 = document.getElementById("checkbox-O-0");
const checkboxQuote = document.getElementById("checkbox-quote");

const lowerCase = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']; //26
const upperCase = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']; //26
const symbols = ['!', '"', '#', '$', '%', '&', "'", '(', ')', '*', '+', ',', '-', '.', '/', ':', ';', '<', '=', '>', '?', '@', '[', '\\', ']', '^', '_', '`', '{', '|', '}', '~']; //32
const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9']; //10

const similarSymbols = ['rn', 'vv', 'cl', 'cI', "''", "``", '__'];

const similar_I_l = ['I', 'l', '|'];
const similar_O_0 = ['O', 'o', '0'];
const similarQuote = ["`", "'"];

const checkboxesPlus = [
  checkboxLower,
  checkboxUpper,
  checkboxNumbers,
  checkboxSpecial,
];

checkboxesPlus.forEach((checkbox) => {
  checkbox.onclick = () => {
    const checkedCount = checkboxesPlus.filter((cb) => cb.checked).length;

    if (checkedCount === 0) {
      checkbox.checked = true;
    }
  };
});

const plusAll = [lowerCase, upperCase, numbers, symbols];
const minusAll = [similar_I_l, similar_O_0, similarQuote];

function randomSymbolGenerator() {
  let noSmartResult, smartResult;

  const plus = [checkboxLower.checked, checkboxUpper.checked, checkboxNumbers.checked, checkboxSpecial.checked],
        minus = [checkbox_i_l.checked, checkbox_O_0.checked, checkboxQuote.checked];

  const plusTrue = [],
        minusTrue = [];

  for (let i = 0; i < plus.length; i++) {
    if (plus[i]) {
      plusTrue.push(plusAll[i]);
    }
  }
  for (let i = 0; i < minus.length; i++) {
    if (minus[i]) {
      minusTrue.push(minusAll[i]);
    }
  }

  function mergeArrays(...arrays) {
    return arrays.flat();
  }

  const plusTrueResult = mergeArrays(...plusTrue);
  const minusTrueResult = mergeArrays(...minusTrue);

  for (let i = 0; i < minusTrueResult.length; i++) {
    const index = plusTrueResult.indexOf(minusTrueResult[i]);
    if (index !== -1) {
       plusTrueResult.splice(index, 1);
    }
  }

  let preparedSymbolList = plusTrueResult;

  function generateResult() {
    const quantity = textInput.value;

    let result = "";

    for (let i = 0; i < quantity; i++) {
      let j = Math.floor(Math.random() * preparedSymbolList.length);

      result += preparedSymbolList[j];
    }
    return result;
  }

  noSmartResult = generateResult();

  if (!checkboxSmart.checked) {
    return noSmartResult;
  } else {
    function smartPassword() {
      let foundMatch = true;
      let localSmartResult = noSmartResult;

      while (foundMatch) {
        foundMatch = false;

        for (let i = 0; i < similarSymbols.length; i++) {
          const regex = new RegExp(similarSymbols[i], "g");

          if (regex.test(localSmartResult)) {
            foundMatch = true;

            localSmartResult = localSmartResult.replace(regex, (match) => {
              const randomSymbol =
              preparedSymbolList[
                  Math.floor(Math.random() * preparedSymbolList.length)
                ];

              const indexToReplace = Math.floor(Math.random() * match.length);
              return match
                .split("")
                .map((char, index) =>
                  index === indexToReplace ? randomSymbol : char
                )
                .join("");
            });
          }
        }
      }
      return localSmartResult;
    }
    smartResult = smartPassword();
    return smartResult;
  }
}

