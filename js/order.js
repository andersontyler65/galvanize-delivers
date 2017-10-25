$(document).ready(function() {
  // console.log( "ready!" );
  console.log('this is the correct js file')
  let cart = [];

  $('.card .btn').click((event) => {
    event.preventDefault()
    console.log("you clicked", event.target)

    let card = $(event.target).parent().parent()
    let price = card.find('.price').text()
    let title = card.find('.card-title').text()

    console.log('price is', price)
    console.log('title is', title)

    addToCart({
      price,
      title
    })
  })

  // remove from cart
  $('#orders').click('.remove', (event) => {
    let title = $(event.target).data("title")
    console.log("title in remove", title)
    removeFromCart(title)
  })

  function removeFromCart(title) {
    let existingItem = findInCart(title)
    if (existingItem && existingItem.quantity > 0) {
      existingItem.quantity--
    }

    renderCart()
  }

  function addToCart(item) {
    // check if in cart, if so update
    let existingItem = findInCart(item.title)

    if (existingItem) {
      console.log("item exists", existingItem)
      existingItem.quantity++
    } else {
      // else add to cart with qty of 1
      item.quantity = 1
      cart.push(item)
    }

    console.log('cart', cart)

    renderCart()
  }
  //find in cart
  function findInCart(title) {
    let existingItem = null
    for (var i = 0; i < cart.length; i++) {
      if (cart[i].title === title) {
        existingItem = cart[i]
      }
    }
    return existingItem
  }

  function renderCart() {
    // find table
    let tbody = $('.tableBody')

    //clear data
    tbody.children().remove()

    // re-render tbody
    let subtotal = 0
    for (item of cart) {
      let price = parsePrice(item.price)

      if (item.quantity > 0) {
        tbody.append(`<tr>
          <td>${item.title}</td>
          <td>${item.quantity}</td>
          <td>${formatPrice(price)}</td>
          <td><a class="btn btn-primary remove-item" data-title="${item.title}">Remove</a></td>
        </tr>`)
      }
      subtotal += price * +(item.quantity)
      var tax = subtotal * 0.08
      var total = subtotal + tax;
    }
    //do calculate
    console.log("subtotal", subtotal)
    $('#subtotal').text(formatPrice(subtotal))
    $('#tax').text(formatPrice(tax))
    $('#total').text(formatPrice(total))
  }

  function parsePrice(price) {
    return parseFloat(price.replace(/\$/, ''))
  }

  function formatPrice(price) {
    console.log("formatPrice price is", price)
    return '$' + price.toFixed(2)
  }

  $('.modal').modal();
  $(".form").submit(function(event){
    event.preventDefault();
  })
  $('.submit-button').click(function (event) {
    event.preventDefault();
    if (($('#name').val() !== "") && ($('#phone').val() !== "") && ($('#address').val() !== "")) {
      $('#modal1').modal('open')
      let name = $('#name').val()
      $('#modal1 #modal-name').text(name)
      let phone = $('#phone').val()
      $('#modal1 #modal-phone').text(phone)
      let address = $('#address').val()
      $('#modal1 #modal-address').text(address)
      let subtotal = $('#subtotal').text()
      $('#modal1 #modal-subtotal').text(subtotal)
      let tax = $('#tax').text()
      $('#modal1 #modal-tax').text(tax)
      let total = $('#total').text()
      $('#modal1 #modal-total').text(total)

      $('#modal1 h4').text('Thanks for your order!')
    }
  })
})
