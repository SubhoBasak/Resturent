import API from "./API/Api.js";

function create_histogram(this_canvas, labels_data, values_data){
    let plotBanner1 = new Chart(this_canvas, {
        type: 'bar',
        data:{
            labels: labels_data,
            datasets: [{
                label: 'values',
                data: values_data,
                backgroundColor: ['#f79e94', '#f7cb94', '#f7f194', '#a6f794', '#94f0f7', '#94a0f7', '#ea94f7']
            }]
        },
        options:{
            title:{
                display: true,
                text: 'Random value bar plot',
                fontSize: 13,
                fontColor: 'orange',
            },
            legend:{
                position: 'bottom'
            },
            tooltips:{
                enabled: true,
            }
        },
    })
}

// dishistogram
let dish_data = API.get('freq_data/2/3/')

dish_data.then(function(result) {
  let labels_data = Object.keys(result).reverse()
  let values_data = Object.values(result).reverse()
  let CurCanvas = document.getElementById('dishes_id').getContext('2d')
  create_histogram(CurCanvas, labels_data, values_data)
})

// waiter histogram
let waiter_data = API.get('freq_data/1/3/')

waiter_data.then(function(result) {
  let labels_data = Object.keys(result).reverse()
  let values_data = Object.values(result).reverse()
  let CurCanvas = document.getElementById('waiters_id').getContext('2d')
  create_histogram(CurCanvas, labels_data, values_data)
})

// table histogram
let table_data = API.get('freq_data/0/3/')

table_data.then(function(result) {
  let labels_data = Object.keys(result).reverse()
  let values_data = Object.values(result).reverse()
  let CurCanvas = document.getElementById('tables_id').getContext('2d')
  create_histogram(CurCanvas, labels_data, values_data)
})
