import data from "./data.json" assert {type : "json"}
const spentInput = document.getElementById('spentInput')
const IncomeInput = document.getElementById('incomeInput')
const spentButton = document.getElementById('spentButton')
const IncomeButton = document.getElementById('IncomeButton')
const amountInPage = document.getElementById('amount')

setInterval(() => amountInPage.textContent = data.money, 100)

spentButton.addEventListener("click", () => {
    if (float(spentInput) != float) {
        alert("Please put a value that is only numbers")
    }
    else {
        data.money += float(spentInput)
    }

})

incomeButton.addEventListener("click", () => {
    if (float(IncomeInput) != float) {
        alert("Please put a value that is only numbers")
    }
    else {
        data.money -= float(spentInput)
    }
})

