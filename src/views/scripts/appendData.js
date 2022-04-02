let cart = JSON.parse(localStorage.getItem('cart')) || [];
// console.log(cart);
let appendData = (data) => {
  let cont = document.getElementById('container');
  cont.innerHTML = '';

  data.map((el) => {
    let mainCard = document.createElement('div');
    mainCard.id = 'mainCard';

    let bs = document.createElement('p');
    if (el.bestseller !== undefined) {
      bs.innerText = el.bestseller;
      bs.style.color = 'green';
      bs.style.fontWeight = '500';
    }
    // bs.style.border = "1px solid red"

    let img = document.createElement('img');
    img.src = el.link;
    img.id = 'productImage';

    let title = document.createElement('p');
    title.innerText = el.title;
    title.style.fontSize = '14px';
    title.style.padding = '0 10px';

    let rating = document.createElement('span');
    rating.innerText = el.rating;
    rating.style.fontSize = '20px';

    let numberOfRatings = document.createElement('span');
    numberOfRatings.innerText = `(${el.numberOfRatings})`;

    let ratingSpan = document.createElement('span');
    ratingSpan.append(rating, numberOfRatings);

    let miniSpan = document.createElement('span');

    let mrp = document.createElement('span');
    mrp.innerText = 'MRP: ';
    mrp.style.color = 'rgb(157, 157, 157)';

    let price = document.createElement('span');
    price.innerText = `₹${el.price}`;
    price.style.fontWeight = 'bold';

    miniSpan.append(mrp, price);

    //buttons

    let btnDiv = document.createElement('div');
    btnDiv.id = 'btnDiv';

    let btn = document.createElement('button');
    btn.innerText = 'Add To Bag';
    btn.id = 'addToCartBtn';
    btn.addEventListener('click', () => {
      addToCart(el);
    });

    let wishlistBtn = document.createElement('img');
    wishlistBtn.src = './images/wishlist.png';
    wishlistBtn.id = 'wishlistBtn';

    btnDiv.append(wishlistBtn, btn);

    mainCard.append(bs, img, title, miniSpan, ratingSpan, btnDiv);

    cont.append(mainCard);
  });
};
let addToCart = async (item) => {
  // item = item.json();
  // console.log(item);
  alert(`${item.title} added to your bag!`);
  try {
    let product = item;

    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://localhost:5000/cart', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(product));
  } catch (e) {
    console.log({ error: e });
  }
};

let appendCart = (data) => {
  let cont = document.getElementById('container');

  data.map((el) => {
    let mainCard = document.createElement('div');
    mainCard.id = 'mainCard';

    let bs = document.createElement('p');
    if (el.bestseller !== undefined) {
      bs.innerText = el.bestseller;
      bs.style.color = 'green';
      bs.style.fontWeight = '500';
    }

    let img = document.createElement('img');
    img.src = el.link;

    let title = document.createElement('p');
    title.innerText = el.title;
    title.style.fontSize = '14px';
    title.style.padding = '0 10px';

    let rating = document.createElement('span');
    rating.innerText = el.rating;
    rating.style.fontSize = '20px';

    let numberOfRatings = document.createElement('span');
    numberOfRatings.innerText = `(${el.numberOfRatings})`;

    let ratingSpan = document.createElement('span');
    ratingSpan.append(rating, numberOfRatings);

    let miniSpan = document.createElement('span');

    let mrp = document.createElement('span');
    mrp.innerText = 'MRP: ';
    mrp.style.color = 'rgb(157, 157, 157)';

    let price = document.createElement('span');
    price.innerText = `₹${el.price}`;
    price.style.fontWeight = 'bold';

    miniSpan.append(mrp, price);

    //buttons

    let btn = document.createElement('button');
    btn.innerText = 'Remove From Bag';
    btn.style.width = '100%';
    btn.id = 'addToCartBtn';
    btn.addEventListener('click', () => {
      remove(el);
      // location.reload();
    });

    mainCard.append(bs, img, title, miniSpan, ratingSpan, btn);

    cont.append(mainCard);
  });
};

let remove = async (item) => {
 
  try {
    let product = item;
    console.log(product);
    var xhr = new XMLHttpRequest();
    xhr.open('PATCH', 'http://localhost:5000/cart', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(product));
  } catch (e) {
    console.log({ error: e });
  } finally {
    alert(`${item.title} removed from your bag!`);
    location.reload();
  }
};


export { appendData, appendCart };
