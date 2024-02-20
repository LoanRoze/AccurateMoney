//Recupération des elements dans le html
const tasksInPage = document.getElementById("tasks");
const taskInput1 = document.getElementById("taskNameInput");
const taskInput2 = document.getElementById("taskAmountInput");
const taskButton = document.getElementById("addButton");
const regEx = /\d*/;

//Recupération des données dans le cache
let tasksData = JSON.parse(localStorage.getItem("tasks"));
let personData = [];
let amountAfter = 0;

//Création de la donnée si innexistante
if (tasksData === null) {
  tasksData = [];
  localStorage.setItem("tasks", JSON.stringify(tasksData));
}

function updatePerson() {
  for (let elem = 0; elem < tasksData.length; elem++) {
    const element = tasksData[elem].name;
    if (!personData.includes(element)) personData.push(element);
  }
}

function updateAmount() {
  amountAfter = 0;
  for (let elem = 0; elem < tasksData.length; elem++) {
    const element = tasksData[elem].amount;
    amountAfter += Number(element);
  }
  localStorage.setItem("amountAfter", JSON.stringify(amountAfter));
}

//Fonction qui permet de mettre a jour sur la page
function updateTaskOnPage() {
  //On supprime l'ancienne liste pour pouvoir la mettre a jour
  while (tasksInPage.firstChild) {
    tasksInPage.removeChild(tasksInPage.firstChild);
  }
  //On parcourt la liste et on insere le nom, la valeur et un bouton qui permet de supprimer l'element
  for (let index = 0; index < tasksData.length; index++) {
    element = tasksData[index];
    //Création de l'element li dans la liste ul
    let li = document.createElement("li");
    let name = document.createElement("div");
    let amount = document.createElement("div");
    //Création du Boutton
    let button = document.createElement("button");
    button.className = "removeButtonTask";
    name.className = "name";
    amount.className = "amount";
    //Ajout de la fonction qui supprime l''élément de la liste ul et du array
    button.addEventListener("click", (event) => {
      if (
        confirm(
          "You're about to delete an element from your task, are you sure ?"
        )
      ) {
        event.target.parentNode.remove();
        tasksData.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasksData));
        updatePerson();
        updateAmount();
      }
    });
    name.textContent = element.name;
    amount.textContent = Math.round(element.amount * 100) / 100;
    //On ajoute tout dans li
    li.appendChild(name);
    li.appendChild(amount);
    li.appendChild(button);
    //On ajoute tout dans ul
    tasksInPage.appendChild(li);
  }
  updatePerson();
  updateAmount();
}

//Mise à jour des tasks sur la page
updateTaskOnPage();

//Ajout d'une task
taskButton.addEventListener("click", () => AddTask());
taskInput1.addEventListener("keydown", (event) => {
  if (event.code == "Enter") AddTask();
});
taskInput2.addEventListener("keydown", (event) => {
  if (event.code == "Enter") AddTask();
});
resetButton.addEventListener("click", () => {
  if (confirm("You're about to reset your tasks, are you sure ?")) {
    tasksData = [];
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    updateTaskOnPage();
  }
});

function AddTask() {
  //Verification que les valeurs correspondent à ce qui est demandé
  if (
    taskInput1.value === "" ||
    taskInput2.value === "" ||
    !regEx.test(taskInput2.value)
  ) {
    alert("Please put a name and a value in the input");
  }
  //Insertion des données dans le tableau
  else {
    //Verification que la personne est deja dans le tableau
    if (personData.includes(taskInput1.value)) {
      for (let eleme = 0; eleme < tasksData.length; eleme++) {
        const element = tasksData[eleme].name;
        //On trouve la personne et on met a jour la data
        if (taskInput1.value === element)
          tasksData[eleme].amount =
            Number(tasksData[eleme].amount) + parseFloat(taskInput2.value);
      }
      //Sinon on créait la personne
    } else {
      tasksData.push({
        name: taskInput1.value,
        amount: taskInput2.value,
      });
    }

    //Insertion du tableau dans le cache
    localStorage.setItem("tasks", JSON.stringify(tasksData));
    //On clear les input
    taskInput1.value = "";
    taskInput2.value = "";
    //Mise a jour sur la page
    updateTaskOnPage();
  }
}
