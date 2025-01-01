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
