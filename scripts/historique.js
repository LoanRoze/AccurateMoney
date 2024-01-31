const listeHistory = document.getElementById("historique")
let historyData = JSON.parse(localStorage.getItem("history"))
let clearButton = document.getElementById("clearButton")

updateHistoryOnPage()

console.log(historyData.length);
function updateHistoryOnPage() {
    for (let index = 0; index < historyData.length; index++) {
        element = historyData[index]
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(element.message + ' | ' + element.moneyChange + " | " + element.date));
        listeHistory.appendChild(li);
        console.log(element);
    }
}

clearButton.addEventListener("click", () => {
    let response = confirm("You're about to delete the complete history, are you sure ?")
    console.log(response);
    if (response) {
        historyData = []
        localStorage.setItem("history", JSON.stringify(historyData));
        listeHistory.innerHTML = ""
    }
})