let pageName = window.location.pathname

const index = document.getElementById("homespace")
const mycard = document.getElementById("cardsspace")
const graphic = document.getElementById("graphespace")
const calculator = document.getElementById("calculatorspace")
const history = document.getElementById("homespace")
const slate = document.getElementById("slatespace")


if (pageName === "/") index.style.display = "none"
if (pageName === "/mycard") mycard.style.display = "none"
if (pageName === "/graphic") graphic.style.display = "none"
if (pageName === "/calculator") calculator.style.display = "none"
if (pageName === "/historique") history.style.display = "none"
if (pageName === "/slate") slate.style.display = "none"