let button = document.getElementById('submit')

button.addEventListener('click', Submit)

let Submit = () => {
    let form = document.querySelector('form');
    
    let category = document.querySelector('#category').value;
    //   console.log("category:", category)
    form.action = `http://localhost:5000/${category}`
    form.method = 'post'
    form.submit();
}