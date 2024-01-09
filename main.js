let carts = document.querySelectorAll('.add-cart');
let products = JSON.parse(localStorage.getItem('product')) || [];
console.log(products);

for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', () => {
        cartNumbers(products[i]);
        totalCost(products[i]);

    })

}

function onLoadCartNumber() {

    let productNumber = localStorage.getItem('cartNumbers');
    if (productNumber) {
        document.querySelector('.carts span').textContent = productNumber;
    }
}

function cartNumbers(product) {

    let productNumber = localStorage.getItem('cartNumbers');
    productNumber = parseInt(productNumber);
    if (productNumber) {
        localStorage.setItem('cartNumbers', productNumber + 1)
        document.querySelector('.carts span').textContent = productNumber + 1;
    } else {
        localStorage.setItem('cartNumbers', 1)
        document.querySelector('.carts span').textContent = 1;
    }
    setItems(product);
}



function setItems(product) {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);

    if (cartItems != null) {
        if (cartItems[product.id] == undefined) {
            cartItems = {
                ...cartItems,
                [product.id]: {
                    ...product,
                    inCart: 1,
                    status: 'pending'  // Default status is set to 'pending'
                }
            };
        } else {
            cartItems[product.id].inCart += 1;
        }
    } else {
        product.inCart = 1;
        product.status = 'pending';  // Default status is set to 'pending'
        cartItems = {
            [product.id]: product
        };
    }

    localStorage.setItem('productsInCart', JSON.stringify(cartItems));
    console.log(cartItems);
}

function totalCost(product) {
    console.log("price is ", product.price);


    let cartCost = localStorage.getItem('totalCost');
    console.log("price is ", cartCost);


    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem('totalCost', cartCost + product.price);
    } else {
        localStorage.setItem('totalCost', product.price);
    }

}

function displayCart() {
    let cartItems = localStorage.getItem('productsInCart');
    cartItems = JSON.parse(cartItems);
    let productContainer = document.getElementById('tdbody');
    if (cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
                <tr id="${item.id}">
                    <td class="Rem-btn">
                        <a href="#"><i class="far fa-times-circle"></i></a>
                    </td>
                    <td>
                        <img src="${item.image}" alt="">
                    </td>
                    <td>${item.title}</td>
                    <td>$${item.price}</td>
                    <td> <input type="number" value="${item.inCart}"></td>
                    <td>$${item.price*item.inCart}</td>
                    <td>${item.status}</td>
                </tr>
            
            `
        });

    }
    const removeBtn = document.getElementsByClassName("Rem-btn");
    for (var i = 0; i < removeBtn.length; i++) {
        button = removeBtn[i];
        button.addEventListener("click", removeItem);
    }

    function removeItem(event) {
        btnClicked = event.target;
        btnClicked.parentElement.parentElement.parentElement.remove();

        console.log(cartItems);
        for (let i = 1; i < cartItems.length; i++) {
            console.log(cartItems[i]);
        }

    }

}
onLoadCartNumber();
displayCart();