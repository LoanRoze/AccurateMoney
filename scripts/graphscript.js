const data = JSON.parse(localStorage.getItem("money"));
const canva = document.getElementById("canvas");
const changeButton = document.getElementById("changeButton")
const averageSpace = document.getElementById("averageAmount")
const textSpace = document.getElementById("textSpace")
let moneyList = [];
let daysList = [];
let average = 0
let currentGraphSelection = 0
let graph = undefined


function createGraphWeek() {
  average = 0
  moneyList = []
  daysList = []
  for (let index = 1; index < 8; index++) {
    moneyList.push(data[data.length - 8 + index].money);
    daysList.push(data[data.length - 8 + index].day);
    average += data[data.length - 8 + index].money
  }
  average = average / 7
  textSpace.textContent = "Last 7 Days"
  averageSpace.textContent = Math.round((average) * 100) / 100;
  createGraph(canva, moneyList, daysList);
}

function createGraph30Days() {
  average = 0
  moneyList = []
  daysList = []
  for (let index = 1; index < 31; index++) {
    moneyList.push(data[data.length - 31 + index].money);
    daysList.push(data[data.length - 31 + index].date);
    average += data[data.length - 31 + index].money
  }
  average = average / 30
  textSpace.textContent = "Last 30 Days"
  averageSpace.textContent = Math.round((average) * 100) / 100;
  createGraph(canva, moneyList, daysList);
}

function createGaphMonth() {
  average = 0
  moneyList = []
  daysList = []
  let currentMonth = data[data.length - 1].month;
  let valuesAmount = 0
  for (let index = 1; index < 31; index++) {
    if (data[data.length - 31 + index].month == currentMonth) {
      moneyList.push(data[data.length - 31 + index].money);
      daysList.push(data[data.length - 31 + index].date);
      average += data[data.length - 31 + index].money
      valuesAmount += 1
    }
  }
  average = average / valuesAmount;
  textSpace.textContent = "This Month"
  averageSpace.textContent = Math.round((average) * 100) / 100;
  createGraph(canva, moneyList, daysList);
}

createGraphWeek()

changeButton.addEventListener("click", () => {
  if (currentGraphSelection == 2) currentGraphSelection = 0
  else (currentGraphSelection += 1)
  if (graph != undefined) graph.destroy()
  if (currentGraphSelection == 0) createGraphWeek()
  if (currentGraphSelection == 1) createGaphMonth()
  if (currentGraphSelection == 2) createGraph30Days()
})

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
            },
          },
        ],
      },
    },
  });
}

