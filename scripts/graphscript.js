const data = JSON.parse(localStorage.getItem("money"));
const canva = document.getElementById("canvas");
const changeButton = document.getElementById("changeButton");
const averageSpace = document.getElementById("averageAmount");
const textSpace = document.getElementById("textSpace");
let moneyList = [];
let daysList = [];
let average = 0;
let currentGraphSelection = 0;
let graph = undefined;

//Fonctions qui font les listes de money/days 
function createGraphWeek() {
  createListOfXDays(7, true);
  average = calculateAverageSpent(moneyList);
  textSpace.textContent = "Last 7 Days";
  averageSpace.textContent = Math.round(average * 100) / 100 + "€";
  createGraph(canva, moneyList, daysList);
}

function createGraph30Days() {
  createListOfXDays(30, false);
  average = calculateAverageSpent(moneyList);
  textSpace.textContent = "Last 30 Days";
  averageSpace.textContent = Math.round(average * 100) / 100 + "€";
  createGraph(canva, moneyList, daysList);
}

function createGaphMonth() {
  moneyList = [];
  daysList = [];
  let currentMonth = data[data.length - 1].month;
  for (let index = 0; index < data.length; index++) {
    if (data[index].month == currentMonth) {
      moneyList.push(Math.round(data[index].money * 100) / 100);
      daysList.push(data[index].date);
    }
  }
  average = calculateAverageSpent(moneyList);
  textSpace.textContent = "This Month";
  averageSpace.textContent = Math.round(average * 100) / 100 + "€";
  createGraph(canva, moneyList, daysList);
}

function calculateAverageSpent(moneyList) {
  let average = 0;
  let lastValue = moneyList[0];
  for (let moneyIndex = 0; moneyIndex < moneyList.length; moneyIndex++) {
    const element = moneyList[moneyIndex];
    if (moneyIndex != 1) {
      average += element - lastValue;
      lastValue = element;
    }
  }
  return average / (moneyList.length - 1);
}

function createListOfXDays(x, days) {
  moneyList = [];
  daysList = [];
  if (data.length >= x) {
    for (let index = 1; index < x + 1; index++) {
      if (index < data.length) {
        moneyList.push(Math.round(data[data.length - (x + 1) + index].money * 100) / 100);
        if (days) daysList.push(data[data.length - (x + 1) + index].day);
        else daysList.push(data[data.length - (x + 1) + index].date)
      }
    }
  } else {
    importEveryValuesOfList();
  }
}

function importEveryValuesOfList() {
  for (let index = 0; index < data.length; index++) {
    moneyList.push(Math.round(data[index].money * 100) / 100);
    daysList.push(data[index].day);
  }
}

createGraphWeek();

changeButton.addEventListener("click", () => {
  if (currentGraphSelection == 2) currentGraphSelection = 0;
  else currentGraphSelection += 1;
  if (graph != undefined) graph.destroy();
  if (currentGraphSelection == 0) createGraphWeek();
  if (currentGraphSelection == 1) createGaphMonth();
  if (currentGraphSelection == 2) createGraph30Days();
});

function createGraph(obj, data, values) {
  obj.innerHTML = "";
  //obj : html item, data : graph values, values : bottom values
  graph = new Chart(obj, {
    type: "line",
    data: {
      labels: values,
      datasets: [
        {
          data: data,
          borderColor: "#DAA520",
          fill: true,
          label: "money",
          backgroundColor: "#F0E68C",
        },
      ],
    },
    options: {
      legend: { display: true },
      scales: {
        xAxes: [
          {
            display: true,
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: "#2b2a27",
            },
          },
        ],
        yAxes: [
          {
            display: true,
            gridLines: {
              display: true,
            },
            ticks: {
              fontColor: "#2b2a27",
              // stepSize: 50, // <---- ICI POUR REGLER LA TAILLE ENTRE LES LIGNES
            },
          },
        ],
      },
    },
  });
}
