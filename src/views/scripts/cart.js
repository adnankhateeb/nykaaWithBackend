import { appendData, appendCart } from '../scripts/appendData.js';

import { navbar } from '../components/navbar.js';

let navbarDiv = document.getElementById('navbar');

navbarDiv.innerHTML = navbar();

// let cartItems = JSON.parse(localStorage.getItem('cart')) || [];

let url = 'https://nykaa-clone-api.herokuapp.com/cart/';
let getData = async () => {
  try {
    let fetched = await fetch(url);
    let dataFetched = await fetched.json();
    return dataFetched;
  } catch (error) {
    console.log(error);
  }
};

// let postData = async

let cartItems = await getData();
// console.log("cartItems:", cartItems)

appendCart(cartItems);

var total = cartItems.reduce(function (acc, cv) {
  return Math.round(acc + Number(cv.price));
}, 0);

let tp = document.querySelector('.totalprice');
tp.style.marginTop = '7%';
tp.innerText = `₹${total}`;

let containerDiv = document.getElementById('container');

document.querySelector('#but1').addEventListener('click', check);
function check() {
  window.location.href = 'address.html';
}

// containerDiv.style.display = "flex";
// containerDiv.style.flexDirection  = "column";
