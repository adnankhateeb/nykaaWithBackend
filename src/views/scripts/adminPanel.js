var button = document.querySelector('#submit');

button.addEventListener('click', Submit);

function Submit() {
  console.log('hello');
  let form = document.querySelector('form');

  let title = document.querySelector('#title').value;
  form.action = `https://nykaa-clone-api.herokuapp.com/products/`;
  form.method = 'post';
  form.submit();
  alert(`${title} has been added to the site!`);
}
