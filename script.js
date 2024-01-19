const spentInput = document.getElementById("spentInput");
const incomeInput = document.getElementById("incomeInput");
const spentButton = document.getElementById("spentButton");
const incomeButton = document.getElementById("incomeButton");
const setButton = document.getElementById("setButton");
const setInput = document.getElementById("setInput");

const amountInPage = document.getElementById("amount");
const regEx = /\d*/;
let moneyData = JSON.parse(localStorage.getItem("money"));
localStorage.setItem("money", JSON.stringify(moneyData));

setInterval(() => {
  localStorage.setItem("money", JSON.stringify(moneyData));
  amountInPage.textContent = moneyData;
}, 100);

function addMoney(addValue) {
  if (regEx.test(addValue)) {
    moneyData += eval(addValue);
  } else {
    alert("Please put a value that is only numbers");
  }
}
function decreaseMoney(decValue) {
  if (regEx.test(decValue)) {
    moneyData -= eval(decValue);
  } else {
    alert("Please put a value that is only numbers");
  }
}
function setMoney(value) {
  if (regEx.test(value)) {
    moneyData = eval(value)
  }
  else {
    alert("Please put a value that is only numbers")
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
