$(document).on('click', '.btn-group button', function () {
    $(this).addClass('active').siblings().removeClass('active')

  })

  // $('.btn-info1').click(function () {
  //   $('.btnl-show').toggleClass("Left")
  // })
  // $('.btn-info2').click(function () {
  //   $('.btnr-show').toggleClass("Right")
  // })

  $('.feat-btn').click(function () {
    $('.brakefast-show').toggleClass("show")
  })
  $('.feat-btn2').click(function () {
    $('.meal-show').toggleClass("show1")
  })
  $('.feat-btn3').click(function () {
    $('.snack-show').toggleClass("show2")
  })
  $('.feat-btn4').click(function () {
    $('.dinner-show').toggleClass("show3")
  })


  // CART FUNCTION

  var removeCartItemButtons = document.getElementsByClassName('btn-danger')
  console.log(removeCartItemButtons)
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i]
    button.addEventListener('click', function (event) {
      var buttonClicked = event.target
      buttonClicked.parentElement.parentElement.remove()
      updateCardTotal()
    })
  }

  function updateCardTotal() {
    var cardItemContainer = document.getElementsByClassName('cart-items')[0]
    var cartRows = cardItemContainer.getElementsByClassName('items')
    for (var i = 0; i < cartRows.length; i++) {
      var cartRow = cartRows[i]
      var priceElement = cartRow.getElementsByClassName('price')[0]

    }

  }





