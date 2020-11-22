import API from "./API/Api.js";

function create_histogram(this_canvas, labels_data, values_data) {
  let plotBanner1 = new Chart(this_canvas, {
    type: "bar",
    data: {
      labels: labels_data,
      datasets: [
        {
          label: "values",
          data: values_data,
          backgroundColor: [
            "#f79e94",
            "#f7cb94",
            "#f7f194",
            "#a6f794",
            "#94f0f7",
            "#94a0f7",
            "#ea94f7",
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Random value bar plot",
        fontSize: 13,
        fontColor: "orange",
      },
      legend: {
        position: "bottom",
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}
function create_line_chart(this_canvas, labels_data, values_data) {
  let plotBanner1 = new Chart(this_canvas, {
    type: "line",
    data: {
      labels: labels_data,
      datasets: [
        {
          label: "values",
          data: values_data,
          backgroundColor: [
            "#f79e94",
            "#f7cb94",
            "#f7f194",
            "#a6f794",
            "#94f0f7",
            "#94a0f7",
            "#ea94f7",
          ],
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: "Random value bar plot",
        fontSize: 13,
        fontColor: "orange",
      },
      legend: {
        position: "bottom",
      },
      tooltips: {
        enabled: true,
      },
    },
  });
}

const time_map = ["Daily", "Weekly", "Monthly", "Yearly"];

// dishistogram
let dish_histogram = async (time_id) => {
  let dish_data = await API.get(
    "freq_data/2/" +
      (time_map.indexOf(time_id) == -1 ? 0 : time_map.indexOf(time_id))
  );
  let labels_data = Object.keys(dish_data).reverse();
  let values_data = Object.values(dish_data).reverse();
  let CurCanvas = document.getElementById("dishes_id").getContext("2d");
  create_histogram(CurCanvas, labels_data, values_data);
};

// waiter histogram
let waiter_histogram = async (time_id) => {
  let waiter_data = await API.get(
    "freq_data/1/" +
      (time_map.indexOf(time_id) == -1 ? 0 : time_map.indexOf(time_id))
  );
  let labels_data = Object.keys(waiter_data).reverse();
  let values_data = Object.values(waiter_data).reverse();
  let CurCanvas = document.getElementById("waiters_id").getContext("2d");
  create_histogram(CurCanvas, labels_data, values_data);
};

// table histogram
let table_histogram = async (time_id) => {
  let table_data = await API.get(
    "freq_data/0/" +
      (time_map.indexOf(time_id) == -1 ? 0 : time_map.indexOf(time_id))
  );
  let labels_data = Object.keys(table_data).reverse();
  let values_data = Object.values(table_data).reverse();
  let CurCanvas = document.getElementById("tables_id").getContext("2d");
  create_histogram(CurCanvas, labels_data, values_data);
};

let select_box = document.getElementsByClassName("form-control");

select_box[0].addEventListener("click", (e) => dish_histogram(e.target.value));
select_box[1].addEventListener("click", (e) =>
  waiter_histogram(e.target.value)
);
select_box[2].addEventListener("click", (e) => table_histogram(e.target.value));

dish_histogram(null);
waiter_histogram(null);
table_histogram(null);
