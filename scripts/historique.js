const listeHistory = document.getElementById("historique")
let historyData = JSON.parse(localStorage.getItem("history"))
let clearButton = document.getElementById("clearButton")

updateHistoryOnPage()

console.log(historyData.length);
function updateHistoryOnPage() {
    for (let index = 0; index < historyData.length; index++) {
        element = historyData[index]
        let li = document.createElement('li');
        let button = document.createElement("button");
        button.className = "removeButtonHistory";
        //Ajout de la fonction qui supprime l''élément de la liste ul et du array
        button.addEventListener("click", (event) => {
            if (
            confirm(
                "You're about to delete an element from your history, are you sure ?"
            )
            ) {
            event.target.parentNode.remove();
            historyData.splice(index, 1);
            localStorage.setItem("history", JSON.stringify(historyData));
            }
        });
        //On ajoute tout dans li
        li.appendChild(document.createTextNode(element.message + ' | ' + element.moneyChange + " | " + element.date));
        li.appendChild(button);

        //On ajoute tout dans ul
        listeHistory.appendChild(li);
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