//Initialisation des variables relatives au html
const spentInput = document.getElementById("spentInput");
const incomeInput = document.getElementById("incomeInput");
const spentButton = document.getElementById("spentButton");
const incomeButton = document.getElementById("incomeButton");
const setButton = document.getElementById("setButton");
const setInput = document.getElementById("setInput");

//variables utiles au code
const amountInPage = document.getElementById("amount");
const regEx = /\d*/;
const regEx2 = "\s*";

//On recupere le tableau stockée dans le localstorage
let moneyData = JSON.parse(localStorage.getItem("money"));
let historyData = JSON.parse(localStorage.getItem("history"))
let currentVersion = 2

//On met a jour en chargeant la page
updateMoney()

//On verifie si c'est la premiere connexion au site pour le pc, si c'est le cas on initialise moneyData
if ((moneyData === null || moneyData[0].version != currentVersion)) {
  moneyData = [{
    day: new Date().toLocaleDateString(),
    date: Math.floor(Date.now() / 86400000),
    money: 0,
    version: currentVersion
  }]
  updateMoney()
}

//De meme pour l'historique
if (historyData === null) {
  historyData = []
  updateHistory()
}

//On verifie si ça fait plus d'un jour que la derniere connexion au site s'est fait
if (moneyData[moneyData.length - 1].date != Math.floor(Date.now() / 86400000)) {
    //On ajoute un json a la liste avec la date actuelle et l'argent du dernier jour
    moneyData.push({
        day: new Date().toLocaleDateString(),
        date: Math.floor(Date.now() / 86400000),
        money: moneyData[moneyData.length - 1].money,
        version: currentVersion
    })
    //On supprime le json d'il y a 8 jours si besoin
    if (moneyData.length > 8) {
        moneyData.shift()
    }
}


//Des fonctions qui mettent a jour les données dans le local storage
function updateMoney() {
  localStorage.setItem("money", JSON.stringify(moneyData));
  amountInPage.textContent = moneyData[moneyData.length - 1].money;
}
function updateHistory() {
  localStorage.setItem("history", JSON.stringify(historyData));
}

//Les fonctions qu'on appelle quand on appuie sur les boutons

//Augmenter l'argent de addValue
function addMoney(addValue) {
  if ((regEx.test(addValue)) && (addValue != '')) {
    let messageText = prompt("Reason to declare :").replace(regEx2)
    if (messageText === "") {
      messageText = "Nothing declared"
    }
    historyData.push({
      message: messageText,
      moneyChange: "+" + addValue,
      date: new Date().toLocaleDateString()
    })
    updateHistory()
    
    moneyData[moneyData.length - 1].money += eval(addValue);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Baisser l'argent de decValue
function decreaseMoney(decValue) {
  if ((regEx.test(decValue)) && (decValue != '')) {
    let messageText = prompt("Reason to declare :").replace(regEx2)
    if (messageText === "") {
      messageText = "Nothing declared"
    }
    historyData.push({
      message: messageText,
      moneyChange: "-" + decValue,
      date: new Date().toLocaleDateString()
    })
    updateHistory()

    moneyData[moneyData.length - 1].money -= eval(decValue);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Fonction qui met a jour l'argent a value
function setMoney(value) {
  if ((regEx.test(value)) && (value != '')) {
    moneyData[moneyData.length - 1].money = eval(value);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Les evenements de click sur les boutons

//Bouton Depenses
spentButton.addEventListener("click", () => {
  decreaseMoney(spentInput.value);
  spentInput.value = "";
});

//Input Depense (faire l'evenement quand on appuie sur entrer)
spentInput.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    decreaseMoney(spentInput.value);
    spentInput.value = "";
  }
});

incomeButton.addEventListener("click", () => {
  addMoney(incomeInput.value);
  incomeInput.value = "";
});

incomeInput.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    addMoney(incomeInput.value);
    incomeInput.value = "";
  }
});

setButton.addEventListener("click", () => {
  setMoney(setInput.value);
  setInput.value = "";
});

setInput.addEventListener("keydown", (event) => {
  if (event.code == "Enter") {
    setMoney(setInput.value);
    setInput.value = "";
  }
});

