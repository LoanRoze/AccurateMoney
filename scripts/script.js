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
//On recupere le tableau stockée dans le localstorage
let moneyData = JSON.parse(localStorage.getItem("money"));

//On verifie si c'est la premiere connexion au site pour le pc, si c'est le cas on initialise moneyData
if ((moneyData === null)) {
    moneyData = [{
        day: new Date().toLocaleDateString(),
        date: Math.floor(Date.now() / 86400000),
        money: 0
    }]
}

//On verifie si ça fait plus d'un jour que la derniere connexion au site s'est fait
if (moneyData[moneyData.lenght - 1].date != Math.floor(Date.now() / 86400000)) {
    //On ajoute un json a la liste avec la date actuelle et l'argent du dernier jour
    moneyData.push({
        day: new Date().toLocaleDateString(),
        date: Math.floor(Date.now() / 86400000),
        money: moneyData[0].money
    })
    //On supprime le json d'il y a 8 jours si besoin
    if (moneyData.lenght > 8) {
        moneyData.shift()
    }
}

//Les fonctions qu'on appelle quand on appuie sur les boutons
function updateMoney() {
  localStorage.setItem("money", JSON.stringify(moneyData));
  amountInPage.textContent = moneyData[moneyData.length - 1].money;
}
function addMoney(addValue) {
  if ((regEx.test(addValue)) && (addValue != '')) {
    moneyData[moneyData.length - 1].money += eval(addValue);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}
function decreaseMoney(decValue) {
  if ((regEx.test(decValue)) && (decValue != '')) {
    moneyData[moneyData.length - 1].money -= eval(decValue);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}
function setMoney(value) {
  if ((regEx.test(value)) && (value != '')) {
    moneyData[moneyData.length - 1].money = eval(value);
    updateMoney()
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Les evenements de click sur les boutons
spentButton.addEventListener("click", () => {
  decreaseMoney(spentInput.value);
  spentInput.value = "";
});

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
