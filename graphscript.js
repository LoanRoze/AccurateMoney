const data = JSON.parse(localStorage.getItem("money"))
const canva = document.querySelector("#canva")
let moneyList = []
let daysList = []

for (let index = 0; index < data.length; index++) {
    moneyList.push(data[index].money);
    daysList.push(data[index].date)
}

console.log(moneyList, daysList);


function createGraph(obj, data, values) {//obj : html item, data : graph values, values : bottom values

    new Chart(obj, {
        type: "line",
        data: {
            labels: values,
            datasets: [{
                data: data,
                borderColor: "red",
                fill: true,
                label: "money",
                backgroundColor: "blue"
            },
        ]},
        options: {
            legend:{display: true},
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks : {
                        fontColor: "white"
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks : {
                        fontColor: "white"
                    }
                }]
            }
        }
    })

};



createGraph(canva, moneyList, daysList)