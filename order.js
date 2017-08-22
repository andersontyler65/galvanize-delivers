$(document).ready(() => {
  let cart =[]


  $('.card-action .btn').click((event) => {
    event.preventDefault()
      console.log("you clicked", event.target)
      let card = $(event.target).parent()
      let price = card.find('.price').text()
      let title = card.find('.card-title').text()


        console.log("price is", price)
        console.log('title is', title)
        addToCart({price, title})
    })

      function addToCart(item) {
        //console.log('item is', item)
        cart[cart.length] = item
        //console.log('cart', cart)

        renderCart()
      }

      function renderCart() {
        //find table
        let tbody = $('#orders tbody')

        //clear out all order data
        tbody.children().remove()

        //re-render body
        let subtotal = 0
        for (item of cart) {
          let price = parsePrice(item.price)

          tbody.append(`<tr>
            <td>${item.title}</td>
            <td>1</td>
            <td>${formatPrice(price)}</td>
            </tr>`)

            subtotal += price
        }

        //do calculations
        //console.log("subtotal", subtotal)
        $('#subtotal').text(formatPrice(subtotal))
      }

      function parsePrice(price) {
        return parseFloat(price.replace(/\$/, ''))
      }

      function formatPrice(price) {
        return '$' + price.toFixed(2)
}
})
