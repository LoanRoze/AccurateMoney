//On recupere le tableau stockée dans le localstorage
let moneyData = JSON.parse(localStorage.getItem("money"));

//On verifie si c'est la premiere connexion au site pour le pc, si c'est le cas on initialise moneyData
if (moneyData === null) {
    moneyData = [{
        date: Math.floor(Date.now() / 86400000),
        money: 0
    }]
}

//On verifie si ça fait plus d'un jour que la derniere connexion au site s'est fait
if (moneyData[0].date != Math.floor(Date.now() / 86400000)) {
    //On ajoute un json a la liste avec la date actuelle et l'argent du dernier jour
    moneyData.push({
        date: Math.floor(Date.now() / 86400000),
        money: moneyData[0].money
    })
    //On supprime le json d'il y a 8 jours si besoin
    if (moneyData.lenght > 8) {
        moneyData.shift()
    }
}




console.log(moneyData);

const spentInput = document.getElementById("spentInput");
const incomeInput = document.getElementById("incomeInput");
const spentButton = document.getElementById("spentButton");
const incomeButton = document.getElementById("incomeButton");
const setButton = document.getElementById("setButton");
const setInput = document.getElementById("setInput");

const amountInPage = document.getElementById("amount");
const regEx = /\d*/;

setInterval(() => {
  localStorage.setItem("money", JSON.stringify(moneyData));
  amountInPage.textContent = moneyData[moneyData.length - 1].money;
  console.log(moneyData);
}, 100);



function addMoney(addValue) {
  if ((regEx.test(addValue)) && (addValue != '')) {
    moneyData[moneyData.length - 1].money += eval(addValue);
  } else {
    alert("Please put a value that is only numbers");
  }
}
function decreaseMoney(decValue) {
  if ((regEx.test(decValue)) && (decValue != '')) {
    moneyData[moneyData.length - 1].money -= eval(decValue);
  } else {
    alert("Please put a value that is only numbers");
  }
}
function setMoney(value) {
  if ((regEx.test(addValue)) && (addValue != '')) {
    moneyData[moneyData.length - 1].money = eval(value);
  } else {
    alert("Please put a value that is only numbers");
  }
}

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
