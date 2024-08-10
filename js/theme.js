const body = document.querySelector("body");

const themeButton = document.querySelector("#theme-button");

themeButton.addEventListener("click", () => {
  body.classList.toggle("dark-mode");
});
