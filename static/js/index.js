import { get, post } from "./API/common.js";
$(document).on("click", ".btn-group button", function () {
  $(this).addClass("active").siblings().removeClass("active");
});

$(".feat-btn").click(function () {
  $(".brakefast-show").toggleClass("show");
});
$(".feat-btn2").click(function () {
  $(".meal-show").toggleClass("show1");
});
$(".feat-btn3").click(function () {
  $(".snack-show").toggleClass("show2");
});
$(".feat-btn4").click(function () {
  $(".dinner-show").toggleClass("show3");
});

// ADD to cart
let item = [];
const getItem = (e) => {
  let card = e.target.parentNode;
  // console.log(card.parentNode.getElementsByTagName("img")[0].src);
  let item_name_price = card
    .getElementsByClassName("title")[0]
    .innerText.split("\n");
  let name = item_name_price[0];
  let price = item_name_price[1];
  let item_img = card.parentNode.getElementsByTagName("img")[0].src;
  addCartItem(name, price, item_img);
};

const updateTotal = () => {
  let total = 0.0;
  let cart_list = document.getElementById("cart");
  $("#total").empty();

  for (let i = 1; i < cart_list.childElementCount; i++) {
    let name =
      cart_list.children[i].children[0].children[0].children[1].children[0]
        .innerText;
    let qty = cart_list.children[i].children[1].children[0].value;
    let price = cart_list.children[i].children[2].innerText.split("$")[0];
    let item_price = 0.0;
    qty = parseFloat(qty);
    price = parseFloat(price);
    item_price = item_price + qty * price;
    total = total + item_price;
    addTotalItem(name, qty, item_price);
    item.push({
      itemName: name,
      itemQuantity: qty,
      itemPrice: price,
    });
  }
  document.getElementsByTagName("strong")[0].innerText = "₹" + total;
};

const addCartItem = (name, price, item_img) => {
  $(document).ready(function () {
    $("tbody").append(`<tr class="item-main-list">
      <td class="items">
        <div class="cart-info">
          <img src=${item_img}>
          <div class="p">
            <p>${name}</p>
          </div>
        </div>
      </td>
      <td><input type="number" value="1" min="1" max="99"></td>
      <td class="price">${price}</td>
      <td>
        <button class="btn btn-danger btn-sm pl-2 text-center"><span><i class="fa fa-trash-o pr-2"></i></span></button>
      </td>
    </tr>`);
  });

  $(document).on("click", ".btn-danger", function (e) {
    var r = $(this).closest("tr").remove();
  });
};

const addTotalItem = (name, qty, price) => {
  let list = `<li class="list-group-item d-flex justify-content-between lh-condensed">
  <div>
    <h6 class="my-0">${name}</h6>
    <small class="text-muted">Quantity: ${qty}</small>
  </div>
  <span class="text-muted">₹${price}</span>
</li>`;

  $("#total").prepend(list);
};

let add = document.getElementsByClassName("btn-success");
for (let i = 0; i < add.length - 1; i++) {
  add[i].addEventListener("click", (e) => getItem(e));
}
add[add.length - 1].addEventListener("click", () => {
  console.log(item);
  // post("billing", item);
});
let cardTotal = document
  .getElementById("cartTotal")
  .addEventListener("click", updateTotal);

get("non_veg_meal/?format=json");
