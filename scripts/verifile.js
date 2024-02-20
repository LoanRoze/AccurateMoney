let pageName = window.location.pathname;

const index = document.getElementById("homespace");
const mycard = document.getElementById("cardsspace");
const graphic = document.getElementById("graphespace");
const calculator = document.getElementById("calculatorspace");
const history = document.getElementById("historiquespace");
const slate = document.getElementById("slatespace");

if (pageName === "/") index.style.display = "none";
if (pageName === "/mycard") mycard.style.display = "none";
if (pageName === "/graphic") graphic.style.display = "none";
if (pageName === "/calculator") calculator.style.display = "none";
if (pageName === "/historique") history.style.display = "none";
if (pageName === "/slate") slate.style.display = "none";

//Theme Verification : 0 = auto | 1 = dark | 2 = light
const themeButton = document.getElementById("themeButton");
const body = document.querySelector("body");
const footer = document.querySelector("footer");
let theme = JSON.parse(localStorage.getItem("theme"));

//Fonction qui retourne true si l'appareil est en dark mode
function isDarkMode() {
  return (
    globalThis.matchMedia?.("(prefers-color-scheme:dark)").matches ?? false
  );
}

//Fonction qui met a jour le theme dans le cache
function updateTheme() {
  if (theme === null) {
    theme = 0;
  }
  localStorage.setItem("theme", JSON.stringify(theme));
}

//Fonction qui met a jour le theme sur la page
function setTheme() {
  if (theme === 0) {
    if (isDarkMode()) {
      darkTheme();
      themeButton.src = "../assets/autoIconeD.png";
    } else {
      lightTheme();
      themeButton.src = "../assets/autoIconeL.png";
    }
  }
  if (theme === 1) {
    darkTheme();
    themeButton.src = "../assets/moonIcone.png";
  }
  if (theme === 2) {
    lightTheme();
    themeButton.src = "../assets/sunIcone.png";
  }
}

//Fonction qui change la page en darkTheme
function darkTheme() {
  body.style.background = "linear-gradient(to right, #000046, #1cb5e0)";
  body.style.color = "white";
  footer.style.color = "white";
  document.documentElement.style.setProperty(
    "--color-of-border",
    "rgb(78, 113, 218)"
  );
  document.documentElement.style.setProperty("--color-of-text", "white");
}

//Fonction qui change la page en lightTheme
function lightTheme() {
  body.style.color = "black";
  body.style.background =
    "linear-gradient(90deg,rgba(2, 0, 36, 1) 0%,rgba(198, 150, 201, 1) 0%,rgba(192, 152, 203, 1) 37%,rgba(212, 134, 233, 1) 47%,rgba(153, 216, 235, 1) 78%,rgba(216, 244, 250, 1) 100%)";
  footer.style.color = "black";
  document.documentElement.style.setProperty("--color-of-border", "pink");
  document.documentElement.style.setProperty("--color-of-text", "black");
}

//Event de click sur l'image pour changer le theme
themeButton.addEventListener("click", () => {
  if (theme < 2) theme += 1;
  else theme = 0;
  updateTheme();
  setTheme();
});

updateTheme();
setTheme();
