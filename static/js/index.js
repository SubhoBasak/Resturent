import API from "./API/Api.js";
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

//Get User Details
const getUser = () => {
  let userDetails = document.getElementsByClassName("form-control");
  let details = {
    email: userDetails[0].value,
    phone: userDetails[1].value,
    username: userDetails[2].value,
    table_no: userDetails[3].value,
    no_of_customer: userDetails[4].value,
    waiter: userDetails[5].value,
  };
  //   console.log(details);
  API.post(window.location.pathname.slice(1), details);
  userDetails[0].readOnly = true;
  userDetails[1].readOnly = true;
  userDetails[2].readOnly = true;
  let x = document.getElementsByClassName("btn-save")[0];
  x.classList.remove("btn-primary");
  x.classList.add("btn-secondary");
  x.classList.remove("btn-save");
  x.classList.add("w-100");
  x.removeEventListener("click", getUser);
};

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

//Add to Total
const updateTotal = (discount) => {
  let total = 0.0;
  item = [];
  let cart_list = document.getElementById("cart");
  $("#total").empty();

  for (let i = 1; i < cart_list.childElementCount; i++) {
    let name =
      cart_list.children[i].children[0].children[0].children[1].children[0]
        .innerText;
    let qty = cart_list.children[i].children[1].children[0].value;
    let price = cart_list.children[i].children[2].innerText.split("₹")[1];
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
  let discounted_total = total * discount;
  total = total - total * discount;
  document.getElementsByTagName("strong")[0].innerText = "₹" + total;
  return discounted_total;
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

//Get Menu List
const getMenu = async (type) => {
  let menu_type = ["breakfast", "meal", "snacks", "dinner"];
  let menu_list_body = document.getElementsByClassName("menu-list");
  $(menu_list_body).empty();
  for (let j = 0; j < menu_list_body.length; j++) {
    let response = await API.get(type + menu_type[j] + "/?format=json");
    for (let i = 0; i < response.length; i++) {
      addCard(
        menu_list_body[j],
        response[i].image,
        response[i].name,
        response[i].price
      );
    }
  }

  let add = document.getElementsByClassName("btn-success");
  for (let i = 0; i < add.length - 1; i++) {
    add[i].addEventListener("click", (e) => getItem(e));
  }

  // console.log(document.getElementById("code").value);
  add[add.length - 1].addEventListener("click", () => {
    // console.log(window.location.pathname.slice(1));
    API.post(window.location.pathname.slice(1), item); //test url for menu
    // post("billing", item);
  });
};

const addCard = (body, img, title, price) => {
  let card_HTML = `<div class="card1">
  <img src=${img} class="card-img-top">
  <div class="card-body">
    <h5 class="title">${title}<span>₹ ${price}</span></h5>
    <button class="btn btn-success">Add</button>
  </div>
</div>`;

  $(body).append(card_HTML);
};

//find user
const findUser = async (e) => {
  let data = e.target.parentNode.previousElementSibling.value;
  let response = await API.get(
    "customer_details_" + (e.target.id == "email" ? "email/" : "phone/") + data
  );
  let user = document.getElementsByClassName("user");
  user[0].value = response.email;
  user[1].value = response.phone;
  user[2].value = response.name;
};

//promo code handler
const handlePromoCode = async () => {
  let response = await API.get(
    "promo_code/" + document.getElementById("code").value
  );

  let disc_total = updateTotal(response.discount / 100);

  let discount_button = document.getElementsByClassName("disButt")[0];

  let promo_span = document.getElementById("promo-span");
  promo_span.removeChild(discount_button);

  let promo_html = document.createElement("span");
  promo_html.setAttribute("class", "text-success");
  promo_html.innerText = "- ₹ " + disc_total;

  let remove_button = document.createElement("button");
  remove_button.setAttribute("class", "cancel");
  remove_button.innerText = " x";
  remove_button.addEventListener("click", () => {
    promo_span.removeChild(promo_html);
    promo_span.removeChild(remove_button);
    promo_span.appendChild(discount_button);
  });

  promo_span.appendChild(promo_html);
  promo_span.appendChild(remove_button);
};

// Event Listener for menu change
getMenu("veg_");
let menu_buttons = document.getElementsByClassName("btn-outline-info");
menu_buttons[0].addEventListener("click", () => getMenu("veg_"));
menu_buttons[1].addEventListener("click", () => getMenu("non_veg_"));

//Event Listener to save user detail
let saveUser = document
  .getElementsByClassName("btn-save")[0]
  .addEventListener("click", getUser);

//Event Listner to update total
let cardTotal = document

  .getElementById("cartTotal")
  .addEventListener("click", () => updateTotal(0));

//Event Listner to search user
let email = document
  .getElementById("email")
  .addEventListener("click", findUser);
let ph_no = document
  .getElementById("ph_no")
  .addEventListener("click", findUser);

//Event Listner for promo code
let promo = document
  .getElementById("submitPromo")
  .addEventListener("click", handlePromoCode);
