const logoutLink = document.getElementById('logoutLink');

logoutLink.addEventListener('click', function (event) {
    event.preventDefault();

    logoutAdmin();
});

function logoutAdmin() {
    localStorage.removeItem("adminName");
    localStorage.removeItem("adminEmail");
    localStorage.removeItem("adminPassword");
    window.location.href = "SignUp&Login/adminLogin.html";
}


const productsInCart = JSON.parse(localStorage.getItem('productsInCart')) || [];
const order = document.getElementById('orderList');
console.log(productsInCart)

function displayOrder() {
    order.innerHTML = ''; // Clear previous content

    Object.values(productsInCart).forEach(product => {
        let div = document.createElement('div');
        div.dataset.id = product.id;

        let p = document.createElement('p');

        // Add each piece of information on a new line
        p.innerHTML += 'Product ID: ' + product.id + '<br>';
        p.innerHTML += 'Title: ' + product.title + '<br>';
        p.innerHTML += 'Price: ' + product.price + '<br>';
        p.innerHTML += 'Quantity: ' + product.inCart + '<br>';
        p.innerHTML += 'Total Price: ' + product.price * product.inCart + '<br>';
        p.innerHTML += '----------------------<br>';

        div.appendChild(p);

        let btn = document.createElement('button');
        btn.className = "accept";
        btn.innerText = "Accept";
        div.appendChild(btn);

        let btn2 = document.createElement('button');
        btn2.className = "reject";
        btn2.innerText = "Reject";
        div.appendChild(btn2);

        order.appendChild(div);
    });
}
function handleButtonClick(action, productId) {
    alert(action + ' button clicked for Product ID: ' + productId);

   
    
}


displayOrder();




let btns = document.querySelectorAll(".accept");

btns.forEach((btn) => {
    btn.onclick = function (e) {
        let id = e.target.parentNode.dataset.id;

        Object.values(productsInCart).forEach(product => {
            if (product.id == id) {
                product.status = 'accept';
            }
        });

        // Update localStorage
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
        handleButtonClick('Accept', id);

    }
});

let btn2s = document.querySelectorAll(".reject");

btn2s.forEach((btn) => {
    btn.onclick = function (e) {
        let id = e.target.parentNode.dataset.id;

        Object.values(productsInCart).forEach(product => {
            if (product.id == id) {
                product.status = 'reject';
            }
        });

        // Update localStorage
        localStorage.setItem('productsInCart', JSON.stringify(productsInCart));
        handleButtonClick('Reject', id);

    }
});