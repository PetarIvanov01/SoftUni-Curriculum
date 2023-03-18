function solve() {

   let textArea = document.getElementsByTagName('textarea')[0]
   let shopingCart = document.getElementsByClassName('shopping-cart')[0];
   let products = [];
   let totalPrice = 0;
   let check = false

   shopingCart.addEventListener('click', add);
   function add(event) {

      if (event.target.nodeName !== 'BUTTON') return;

      if (check) return;

      let button = event.target
      //Array.from(button.classList).indexOf('add-product') >= 0
      if (button.textContent !== 'Checkout') {

         let productElement = event.target.parentElement.parentElement;

         let productName = productElement.getElementsByClassName('product-title')[0].textContent;
         let price = productElement.getElementsByClassName('product-line-price')[0].textContent;

         textArea.textContent += `Added ${productName} for ${Number(price).toFixed(2)} to the cart.\n`

         if (!products.includes(productName)) {
            products.push(productName);

         }

         totalPrice += Number(price);
      }
      else {

         textArea.textContent += `You bought ${products.join(', ')} for ${totalPrice.toFixed(2)}`
         check = true;

      }
   }
}