let pageName = window.location.pathname

const index = document.getElementById("homespace")
const mycard = document.getElementById("cardsspace")
const graphic = document.getElementById("graphespace")
const calculator = document.getElementById("calculatorspace")
// const history = document.getElementById("homespace")
// const slate = document.getElementById("homespace")


if (pageName === "/index.html") index.style.display = "none"
if (pageName === "/mycard.html") mycard.style.display = "none"
if (pageName === "/graphic.html") graphic.style.display = "none"
if (pageName === "/calculator.html") calculator.style.display = "none"
// if (pageName === "/historique.html") history.style.display = "none"
// if (pageName === "/slate.html") slate.style.display = "none"