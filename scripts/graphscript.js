const data = JSON.parse(localStorage.getItem("money"))
const canva = document.getElementById("canvas")
let moneyList = []
let daysList = []

for (let index = 0; index < data.length; index++) {
    moneyList.push(data[index].money);
    daysList.push(data[index].day)
}

console.log(moneyList, daysList);


function createGraph(obj, data, values) {//obj : html item, data : graph values, values : bottom values

    new Chart(obj, {
        type: "line",
        data: {
            labels: values,
            datasets: [{
                data: data,
                borderColor: "#DAA520",
                fill: true,
                label: "money",
                backgroundColor: "#F0E68C",
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
                        fontColor: "#2b2a27"
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                        display: true
                    },
                    ticks : {
                        fontColor: "#2b2a27"
                    }
                }]
            }
        }
    })

};



createGraph(canva, moneyList, daysList)