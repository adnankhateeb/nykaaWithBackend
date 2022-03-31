


import { navbar } from "../components/navbar.js";
import { appendData } from "../scripts/appendData.js"

let navbarDiv = document.getElementById('navbar');


navbarDiv.innerHTML = navbar();

import sidebar from "../components/sidebar.js"
let sidebarDiv = document.getElementById('sidebar');
sidebarDiv.innerHTML = sidebar();

let url = "http://localhost:5000/men";
let getData = async () => {
    try {
        let fetched = await fetch(url);
        let dataFetched = await fetched.json();
        return dataFetched;
    }
    catch (error) {
        console.log(error);
    }
}

let data = await getData();


appendData(data);

let low = document.getElementById('l2h');

low.addEventListener('click', () => {
    
    data.sort((a,b) => {
        return a.price-b.price;
    })
    appendData(data)
})

let high = document.getElementById('h2l')

high.addEventListener('click', () => {

    data.sort((a,b) => {
        return b.price-a.price;
    })
    appendData(data)

})