//Initialisation des variables relatives au html
const spentInput = document.getElementById("spentInput");
const incomeInput = document.getElementById("incomeInput");
const spentButton = document.getElementById("spentButton");
const incomeButton = document.getElementById("incomeButton");
const setButton = document.getElementById("setButton");
const setInput = document.getElementById("setInput");
const resetButton = document.getElementById("resetButton");

//variables utiles au code
const amountInPage = document.getElementById("amount");
const deptsInPage = document.getElementById("depts");
const regEx = /\d*/;
const regEx2 = "s*";

//On recupere le tableau stockée dans le localstorage
let moneyData = JSON.parse(localStorage.getItem("money"));
let historyData = JSON.parse(localStorage.getItem("history"));
let deptsData = JSON.parse(localStorage.getItem("amountAfter"));
let currentVersion = 3;
let testMode = false;

//On verifie si c'est la premiere connexion au site pour le pc, si c'est le cas on initialise moneyData
if (moneyData === null || moneyData[0].version != currentVersion) {
  resetMoney();
}

//De meme pour l'historique
if (historyData === null) {
  historyData = [];
  updateHistory();
}

//On verifie si ça fait plus d'un jour que la derniere connexion au site s'est fait
if (
  moneyData[moneyData.length - 1].day !=
  new Date().toLocaleString("fr-FR", { weekday: "long" })
) {
  //On ajoute un json a la liste avec la date actuelle et l'argent du dernier jour
  moneyData.push({
    day: new Date().toLocaleString("fr-FR", {
      weekday: "long",
    }),
    date: new Date().toLocaleString("fr-FR", {
      day: "numeric",
      month: "short",
      year: "2-digit",
    }),
    month: new Date().toLocaleString("fr-FR", {
      month: "numeric",
    }),
    money: moneyData[moneyData.length - 1].money,
    version: currentVersion,
  });
  //On supprime le json d'il y a 32 jours si besoin (pour eviter trop de valeurs dans le cache)
  if (moneyData.length > 32) {
    moneyData.shift();
  }
}

//On met a jour en chargeant la page
updateMoney();

//Des fonctions qui mettent a jour les données dans le local storage
function updateMoney() {
  localStorage.setItem("money", JSON.stringify(moneyData));
  amountInPage.textContent =
    Math.round(moneyData[moneyData.length - 1].money * 100) / 100;
  localStorage.setItem("amountAfter", JSON.stringify(deptsData));
  if (deptsData < 0) {
    deptsInPage.style.color = "red";
    deptsInPage.textContent = deptsData;
  }
  if (deptsData > 0) {
    deptsInPage.style.color = "green";
    deptsInPage.textContent = "+" + deptsData;
  }
  if (deptsData === 0) {
    deptsInPage.textContent = 0;
  }
}

function updateHistory() {
  localStorage.setItem("history", JSON.stringify(historyData));
}

function resetMoney() {
  moneyData = [
    {
      day: new Date().toLocaleString("fr-FR", {
        weekday: "long",
      }),
      date: new Date().toLocaleString("fr-FR", {
        day: "numeric",
        month: "short",
        year: "2-digit",
      }),
      month: new Date().toLocaleString("fr-FR", {
        month: "numeric",
      }),
      money: 0,
      version: currentVersion,
    },
  ];
}

//Les fonctions qu'on appelle quand on appuie sur les boutons

//Augmenter l'argent de addValue
function addMoney(addValue) {
  if (regEx.test(addValue) && addValue != "") {
    let messageText = prompt("Reason to declare :").replace(regEx2);
    if (messageText === "") {
      messageText = "Nothing declared";
    }
    historyData.push({
      message: messageText,
      moneyChange: "+" + addValue,
      date: new Date().toLocaleDateString(),
    });
    updateHistory();

    moneyData[moneyData.length - 1].money += eval(addValue);
    updateMoney();
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Baisser l'argent de decValue
function decreaseMoney(decValue) {
  if (regEx.test(decValue) && decValue != "") {
    let messageText = prompt("Reason to declare :").replace(regEx2);
    if (messageText === "") {
      messageText = "Nothing declared";
    }
    historyData.push({
      message: messageText,
      moneyChange: "-" + decValue,
      date: new Date().toLocaleDateString(),
    });
    updateHistory();

    moneyData[moneyData.length - 1].money -= eval(decValue);
    updateMoney();
  } else {
    alert("Please put a value that is only numbers");
  }
}

//Fonction qui met a jour l'argent a value
function setMoney(value) {
  if (regEx.test(value) && value != "") {
    moneyData[moneyData.length - 1].money = eval(value);
    updateMoney();
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

resetButton.addEventListener("click", () => {
  if (
    confirm("You're about to entirely reset your money and the datas related")
  ) {
    resetMoney();
    historyData = [];
    localStorage.setItem("tasks", JSON.stringify([]));
    deptsData = 0;
    updateHistory();
    updateMoney();
  }
});

// if (testMode) {
//   moneyData = [
//     {
//       day: "lundi",
//       date: "2 avr. 24",
//       month: "4",
//       money: 204,
//       version: currentVersion,
//     },
//     {
//       day: "mardi",
//       date: "3 avr. 24",
//       month: "4",
//       money: 290,
//       version: currentVersion,
//     },
//     {
//       day: "mercredi",
//       date: "4 avr. 24",
//       month: "4",
//       money: 280,
//       version: currentVersion,
//     },
//     {
//       day: "jeudi",
//       date: "5 avr. 24",
//       month: "4",
//       money: 160,
//       version: currentVersion,
//     },
//     {
//       day: "vendredi",
//       date: "6 avr. 24",
//       month: "4",
//       money: 130,
//       version: currentVersion,
//     },
//     {
//       day: "samedi",
//       date: "7 avr. 24",
//       month: "4",
//       money: 160,
//       version: currentVersion,
//     },
//     {
//       day: "dimanche",
//       date: "8 avr. 24",
//       month: "4",
//       money: 30,
//       version: currentVersion,
//     },
//     {
//       day: "lundi",
//       date: "9 avr. 24",
//       month: "4",
//       money: 30,
//       version: currentVersion,
//     },
//     {
//       day: "mardi",
//       date: "10 avr. 24",
//       month: "4",
//       money: 20,
//       version: currentVersion,
//     },
//     {
//       day: "mercredi",
//       date: "11 avr. 24",
//       month: "4",
//       money: 10,
//       version: currentVersion,
//     },
//     {
//       day: "jeudi",
//       date: "12 avr. 24",
//       month: "4",
//       money: 0,
//       version: currentVersion,
//     },
//     {
//       day: "vendredi",
//       date: "13 avr. 24",
//       month: "4",
//       money: 100,
//       version: currentVersion,
//     },
//     {
//       day: "samedi",
//       date: "14 avr. 24",
//       month: "4",
//       money: 50,
//       version: currentVersion,
//     },
//     {
//       day: "dimanche",
//       date: "15 avr. 24",
//       month: "4",
//       money: 40,
//       version: currentVersion,
//     },
//     {
//       day: "lundi",
//       date: "16 avr. 24",
//       month: "4",
//       money: 30,
//       version: currentVersion,
//     },
//     {
//       day: "mercredi",
//       date: "18 avr. 24",
//       month: "4",
//       money: 20,
//       version: currentVersion,
//     },
//     {
//       day: "jeudi",
//       date: "19 avr. 24",
//       month: "4",
//       money: 10,
//       version: currentVersion,
//     },
//     {
//       day: "vendredi",
//       date: "20 avr. 24",
//       month: "4",
//       money: 1000,
//       version: currentVersion,
//     },
//     {
//       day: "samedi",
//       date: "21 avr. 24",
//       month: "4",
//       money: 560,
//       version: currentVersion,
//     },
//     {
//       day: "dimanche",
//       date: "22 avr. 24",
//       month: "4",
//       money: 340,
//       version: currentVersion,
//     },
//     {
//       day: "lundi",
//       date: "23 avr. 24",
//       month: "4",
//       money: 240,
//       version: currentVersion,
//     },
//     {
//       day: "mardi",
//       date: "24 avr. 24",
//       month: "4",
//       money: 260,
//       version: currentVersion,
//     },
//     {
//       day: "mercredi",
//       date: "25 avr. 24",
//       month: "4",
//       money: 260,
//       version: currentVersion,
//     },
//     {
//       day: "jeudi",
//       date: "26 avr. 24",
//       month: "4",
//       money: 140,
//       version: currentVersion,
//     },
//     {
//       day: "vendredi",
//       date: "27 avr. 24",
//       month: "4",
//       money: 130,
//       version: currentVersion,
//     },
//     {
//       day: "samedi",
//       date: "28 avr. 24",
//       month: "4",
//       money: 120,
//       version: currentVersion,
//     },
//     {
//       day: "dimanche",
//       date: "29 avr. 24",
//       month: "4",
//       money: 10,
//       version: currentVersion,
//     },
//     {
//       day: "lundi",
//       date: "30 avr. 24",
//       month: "4",
//       money: 60,
//       version: currentVersion,
//     },
//     {
//       day: "mardi",
//       date: "1 mai. 24",
//       month: "5",
//       money: 200,
//       version: currentVersion,
//     },
//     {
//       day: "mercredi",
//       date: "2 mai. 24",
//       month: "5",
//       money: 150,
//       version: currentVersion,
//     },
//     {
//       day: "jeudi",
//       date: "3 mai. 24",
//       month: "5",
//       money: 100,
//       version: currentVersion,
//     },
//   ];
//   updateMoney();
// }
