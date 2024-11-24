import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)


// new 31 oct
// document.addEventListener('DOMContentLoaded', () => {
//   const cart = new AnonymousCart();

//   // Example: Adding an item to the cart
//   document.getElementById('add-to-cart-button').addEventListener('click', () => {
//       const item = {
//           id: 1, // Unique item ID
//           name: 'Product A',
//           price: 29.99,
//           quantity: 1,
//       };
//       cart.addItem(item);
//       updateCartUI();
//   });

//   function updateCartUI() {
//       const cartItemsEl = document.getElementById('cart-items');
//       cartItemsEl.innerHTML = ''; // Clear existing items
//       cart.getCart().forEach(item => {
//           const li = document.createElement('li');
//           li.textContent = `${item.name} - $${item.price} x ${item.quantity}`;
//           cartItemsEl.appendChild(li);
//       });
//       document.getElementById('total-items').textContent = cart.getTotalItems();
//       document.getElementById('total-price').textContent = cart.getTotalPrice();
//   }

//   // Initial call to display the cart if it already has items
//   updateCartUI();
// });
