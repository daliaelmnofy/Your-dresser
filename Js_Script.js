const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}
// Fetch data from localStorage and display products

function showDataInUI() {
    const productsSection = document.getElementById('product2');
    console.log(productsSection)
    const storedData = localStorage.getItem('product');
    const dataPro = JSON.parse(storedData) || [];

    let productsHTML = '';

    dataPro.forEach((product, _index) => {
        productsHTML += `
            <div class="pro">
                <img src="${product.image}" alt="${product.title}">
                <div class="des">
                    <span>${product.title}</span>
                    <h5>${product.description}</h5>
                    <h4>${product.total}$</h4>
                    <a class="add-cart"><i class="fal fa-shopping-cart cart"></i></a>
                </div>
            </div>`;
    });

    productsSection.innerHTML = productsHTML;
}

showDataInUI();