
document
  .querySelector(".generate-button")
  .addEventListener("click", function () {
    const svg = this.querySelector("#generate-svg");
    svg.classList.toggle("rotate");
    setTimeout(() => {
      svg.classList.toggle("rotate");
    }, 300);
  });

  
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

const translations = {
  en: {
    title: "Password Generator",
    meta_description: "Secure Password Generator: fast, simple, and safe. Create passwords of various lengths and complexity",
    meta_keywords: "Pilot, Pilot password generator, 3.14lot, 3.14lot password generator, passgen, pass gen, Password generator, Secure passwords, Password creation, Safe passwords, Online password generator",
    og_title: "Secure Password Generator - Fast, Simple, and Safe",
    og_description: "Generate passwords of various lengths and complexity. Online Password Generator",
    twitter_title: "Secure Password Generator",
    twitter_description: "Quickly generate strong and secure passwords online",
    header: "Secure Password Generator",
    subheader: "fast, simple, and safe",
    copy_message: "Password copied!",
    generate_password: "Generate Password",
    hide_password: "Hide Password",
    show_password: "Show Password",
    copy_password: "Copy Password",
    t_password: "password",
    t_smart_content_1: "The «Smart Password» feature automatically controls and eliminates ambiguous character combinations, such as:",
    t_smart_content_2: "Combination of letters:",
    t_smart_content_3: "and",
    t_smart_content_4: "that may look like",
    t_smart_content_5: "Also the combination:",
    t_smart_content_6: "and",
    t_smart_content_7: "that may look like",
    t_smart_content_8: "Or letters:",
    t_smart_content_8_1: "Two identical symbols:",
    t_smart_content_9: "and",
    t_smart_content_9_1: "and",
    t_smart_content_10: "may look like",
    t_smart_content_10_1: "may look like one",
    t_smart_content_11: "Combination of characters:",
    t_smart_content_11_1: "or",
    t_smart_content_12: "and",
    t_smart_content_13: "may look like",
    t_lower: "Lowercase",
    t_upper: "Uppercase",
    t_numbers: "Numbers",
    t_symbols: "Symbols",
    t_exception_1: "Exclude similar characters:",
    t_exception_1_1: "(uppercase \"i\", lowercase \"L\", and vertical bar).",
    t_exception_1_2: "(uppercase \"O\", lowercase \"o\", and zero).",
    t_exception_1_3: "Single quotes",
    t_exception_1_4: "and backticks",
    faq_title: "Frequently Asked Questions",
    faq_title_1: "Is Online Password Generator safe?",
    faq_title_1_content_1: "Absolutely! The «3.14LOT Online Password Generator» operates entirely in your browser, using client-side JavaScript. This ensures that all generated passwords remain solely on your device. None of the generated passwords are transmitted over the network unless you choose to copy them to the clipboard.",
    faq_title_1_content_2: "The tool allows you to create complex passwords resistant to dictionary attacks, ensuring a high level of security. With the «3.14LOT Password Generator», you can create a unique password that meets the strictest security standards.",
    faq_title_2: "Why use a password generator?",
    faq_title_2_content_1: "A modern internet user often has dozens or even hundreds of accounts. Each requires a unique, reliable, and complex password to ensure security. Creating such passwords manually can be difficult and time-consuming.",
    faq_title_2_content_2: "A password generator simplifies this task by quickly creating complex combinations of characters that are nearly impossible to crack. The random password generator ensures the security of your accounts, minimizing the risk of unauthorized access. Using the generator, you can easily enhance the security of your data.",
    faq_title_3: "How to create a secure and reliable password?",
    faq_title_3_content_1: "A secure password is the key to protecting your account and should be known only to you. To enhance security, use at least eight characters, including uppercase and lowercase letters, numbers, and special characters.",
    faq_title_3_content_2: "Avoid easily predictable combinations such as:",
    faq_title_3_content_3: "simple words",
    faq_title_3_content_4: "modifications of the word «password»",
    faq_title_3_content_5: "keyboard patterns like «qwerty» or «asdfgh»",
    faq_title_3_content_6: "sequences like «123456»",
    faq_title_3_content_7: "names, birth dates, or pet names",
    faq_title_3_content_8: "When creating a password, focus on uniqueness and complexity to protect your data from potential breaches.",
    rights: "\u00A9 2025 3.14LOT.COM - All rights reserved",
    contact_us: "Contact us",
  },
  ru: {
    title: "Генератор паролей",
    meta_description: "Генератор надежных паролей: быстро, просто и безопасно. Создавайте пароли различной длины и сложности",
    meta_keywords: "Пилот, Пилот генератор паролей, Пайлот, Пайлот генератор паролей, 3.14лот, 3.14лот генератор паролей, пассген, пасс ген, Генератор паролей, надежные пароли, создание паролей, безопасные пароли, онлайн генератор паролей",
    og_title: "Генератор надежных паролей - быстро, просто и безопасно",
    og_description: "Создавайте пароли различной длины и сложности. Генератор паролей онлайн",
    twitter_title: "Генератор надежных паролей",
    twitter_description: "Быстро создавайте сложные и надежные пароли онлайн",
    header: "Генератор надежных паролей",
    subheader: "быстро, просто и безопасно",
    copy_message: "Пароль скопирован!",
    generate_password: "Сгенерировать пароль",
    hide_password: "Скрыть пароль",
    show_password: "Показать пароль",
    copy_password: "Копировать пароль",
    t_password: "пароль",
    t_smart_content_1: "Функция «Smart пароль» самостоятельно проконтролирует и исключит неоднозначные сочетания символов, например, такие как:",
    t_smart_content_2: "Сочетание букв:",
    t_smart_content_3: "и",
    t_smart_content_4: "которые могут выглядеть как",
    t_smart_content_5: "Также сочетание:",
    t_smart_content_6: "и",
    t_smart_content_7: "которые могут выглядеть как",
    t_smart_content_8: "Либо буквы:",
    t_smart_content_8_1: "Два одинаковых символа:",
    t_smart_content_9: "и",
    t_smart_content_9_1: "и",
    t_smart_content_10: "могут выглядеть как",
    t_smart_content_10_1: "могут выглядеть как один",
    t_smart_content_11: "Сочетание символов:",
    t_smart_content_11_1: "или",
    t_smart_content_12: "и",
    t_smart_content_13: "могут выглядеть как",
    t_lower: "Строчные",
    t_upper: "Заглавные",
    t_numbers: "Цифры",
    t_symbols: "Символы",
    t_exception_1: "Исключить схожие символы:",
    t_exception_1_1: "(Заглавная \"i\", строчная \"L\" и вертикальная черта).",
    t_exception_1_2: "(Заглавная \"O\", строчная \"o\" и цифра ноль).",
    t_exception_1_3: "Одинарные кавычки",
    t_exception_1_4: "и обратный апостроф",
    faq_title: "Часто задаваемые вопросы",
    faq_title_1: "Безопасен ли Генератор паролей онлайн?",
    faq_title_1_content_1: "Абсолютно! «3.14LOT Генератор паролей онлайн» полностью функционирует в вашем браузере, используя клиентский JavaScript. Это гарантирует, что все создаваемые пароли остаются исключительно на вашем устройстве. Ни один из сгенерированных паролей не передается через сеть, кроме случаев, когда вы решаете скопировать его в буфер обмена.",
    faq_title_1_content_2: "Инструмент позволяет создавать сложные, устойчивые к атакам словарного типа пароли, которые обеспечивают высокий уровень защиты. С помощью «3.14LOT Password Generator» вы можете получить уникальный пароль, соответствующий самым строгим стандартам безопасности.",
    faq_title_2: "Почему стоит использовать генератор паролей?",
    faq_title_2_content_1: "Современный интернет-пользователь часто имеет десятки или даже сотни учетных записей. Каждая из них требует уникального, надежного и сложного пароля для обеспечения безопасности. Создать такие пароли самостоятельно может быть сложно и отнимает много времени.",
    faq_title_2_content_2: "Генератор паролей упрощает эту задачу, позволяя быстро создавать сложные комбинации символов, которые практически невозможно взломать. Генератор случайных паролей обеспечивает защиту ваших учетных записей, минимизируя риск несанкционированного доступа. Используя генератор, вы можете легко повысить уровень безопасности ваших данных.",
    faq_title_3: "Как создать безопасный и надежный пароль?",
    faq_title_3_content_1: "Надежный пароль — это ключ к защите вашего аккаунта, и он должен быть известен только вам. Чтобы повысить безопасность, используйте не менее восьми символов, включая заглавные и строчные буквы, цифры и специальные символы.",
    faq_title_3_content_2: "Избегайте легко предсказуемых комбинаций, таких как:",
    faq_title_3_content_3: "простые слова",
    faq_title_3_content_4: "модификации слова «password»",
    faq_title_3_content_5: "шаблоны клавиатуры, такие как «qwerty» или «asdfgh»",
    faq_title_3_content_6: "последовательности вроде «123456»",
    faq_title_3_content_7: "имена, даты рождения или клички домашних животных",
    faq_title_3_content_8: "Создавая пароль, ориентируйтесь на уникальность и сложность, чтобы защитить ваши данные от потенциального взлома.",
    rights: "\u00A9 2025 3.14LOT.COM - Все права защищены",
    contact_us: "Свяжитесь с нами",
  },
};

document.addEventListener("DOMContentLoaded", () => {
  const langSelect = document.getElementById("lang-select");
  const selectLanguage = document.querySelector(".select-language");
  const selectLanguage_img = document.querySelector(".lang-container");
  const elements = document.querySelectorAll("[data-key]");

  let currentLang = localStorage.getItem("language") || getBrowserLanguage();

  function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.languages[0];
    return browserLang.startsWith("ru") ? "ru" : "en";
  }

  function applyTranslations(lang) {
    elements.forEach((el) => {
      const key = el.getAttribute("data-key");
      if (translations[lang][key]) {
        el.textContent = translations[lang][key];
      }
    });
  }

  function updateMetaTags(lang) {
    document.querySelector('meta[name="description"]').setAttribute("content", translations[lang].meta_description);
    document.querySelector('meta[name="keywords"]').setAttribute("content", translations[lang].meta_keywords);
    document.querySelector('meta[property="og:title"]').setAttribute("content", translations[lang].og_title);
    document.querySelector('meta[property="og:description"]').setAttribute("content", translations[lang].og_description);
    document.querySelector('meta[name="twitter:title"]').setAttribute("content", translations[lang].twitter_title);
    document.querySelector('meta[name="twitter:description"]').setAttribute("content", translations[lang].twitter_description);
    document.title = translations[lang].title;
  }

  function updateTitles(lang) {
    document.querySelectorAll("[data-key-title]").forEach((el) => {
      const key = el.getAttribute("data-key-title");
      if (translations[lang][key]) {
        el.setAttribute("title", translations[lang][key]);
      }
    });
  }

  function updateLanguage(lang) {
    document.querySelector(".lang-span").textContent =
      lang === "ru" ? "Русский" : "English";
    localStorage.setItem("language", lang);

    applyTranslations(lang);
    updateMetaTags(lang);
    updateTitles(lang);
  }

  updateLanguage(currentLang);

  selectLanguage_img.addEventListener("click", (event) => {
    event.stopPropagation();
    selectLanguage.classList.toggle("show");
  });

  langSelect.addEventListener("click", (event) => {
    event.stopPropagation();
    selectLanguage.classList.toggle("show");
  });

  document.addEventListener("click", () => {
    selectLanguage.classList.remove("show");
  });

  selectLanguage.addEventListener("click", (event) => {
    const langValue = event.target.getAttribute("value");
    if (langValue) {
      currentLang = langValue;
      updateLanguage(currentLang);
      selectLanguage.classList.remove("show");
    }
  });
});
