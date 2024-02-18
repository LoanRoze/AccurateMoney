const listeHistory = document.getElementById("historique");
let historyData = JSON.parse(localStorage.getItem("history"));
let clearButton = document.getElementById("clearButton");

updateHistoryOnPage();

//Fontion qui met a jour l'historique sur la page
function updateHistoryOnPage() {
  for (let index = 0; index < historyData.length; index++) {
    element = historyData[index];
    //On créait tout les element qui seront dans une ligne de l'historique
    let li = document.createElement("li");
    let message = document.createElement("div");
    let moneyChange = document.createElement("div");
    let date = document.createElement("div");
    let button = document.createElement("button");
    //On ajoute des classes pour simplifier le css
    message.className = "message";
    moneyChange.className = "moneyChange";
    date.className = "date";
    button.className = "removeButtonHistory";
    //Ajout de la fonction qui supprime l''élément de la liste ul et du array
    button.addEventListener("click", (event) => {
      if (
        //Alerte qui confirme la supression de l'element
        confirm(
          "You're about to delete an element from your history, are you sure ?"
        )
      ) {
        event.target.parentNode.remove();
        historyData.splice(index, 1);
        localStorage.setItem("history", JSON.stringify(historyData));
      }
    });
    //Mise a jour du texte contenu dans chaque div
    message.textContent = element.message;
    moneyChange.textContent = Math.round(element.moneyChange * 100) / 100;
    date.textContent = element.date;

    //On ajoute tout dans li
    li.appendChild(message);
    li.appendChild(moneyChange);
    li.appendChild(date);
    li.appendChild(button);

    //On ajoute tout dans ul, au debut de la liste
    listeHistory.insertBefore(li, listeHistory.childNodes[0]);
    // listeHistory.appendChild(li);
  }
}

//Bouton clear condition de clique
clearButton.addEventListener("click", () => {
  //Check de si la personne veut vraiment tout supprimer
  if (confirm("You're about to delete the complete history, are you sure ?")) {
    historyData = [];
    localStorage.setItem("history", JSON.stringify(historyData));
    listeHistory.innerHTML = "";
  }
});
