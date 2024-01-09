let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let description = document.getElementById('description');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let statue = 'create';
let tmp;

//get total price 
function getTotal() {
    const priceValue = parseFloat(price.value);
    const taxesValue = parseFloat(taxes.value) || 0;
    const adsValue = parseFloat(ads.value) || 0;
    const discountValue = parseFloat(discount.value) || 0;

    if (!isNaN(priceValue)) {
        let result = (priceValue + taxesValue + adsValue) - discountValue;
        total.innerHTML = result.toFixed(2);
        total.style.background = '#040';
    } else {
        total.innerHTML = '';
        total.style.background = '#a00d02';
    }
}

//creat product
let productIdCounter = 1;
let inCart = 0;

if (localStorage.product != null) {
    dataPro = JSON.parse(localStorage.product)
} else {
    dataPro = [];
}

submit.onclick = function() {

    let newPro = {
        id: productIdCounter,
        inCart: inCart,
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        description: description.value,
        category: category.value.toLowerCase(),
        image: document.getElementById('imageSource').value || 'title',
    }
    productIdCounter++;

    //clean data
    if (title.value != '' && price.value != '' &&
        category.value != '' && newPro.count < 50) {
        //count
        if (statue === 'create') {
            if (newPro.count > 1) {
                for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);

                }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            statue = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';

        }
        clearData()
    }
    //save localstorage
    localStorage.setItem('product', JSON.stringify(dataPro));

    showData()
}

//cleare inputs
function clearData() {
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    description.value = '';
    category.value = '';
    document.getElementById('imageSource').value = '';

}
//reade
function showData() {
    let uniqueProducts = {};

    for (let i = 0; i < dataPro.length; i++) {
        // Store products in an object using title as a key to ensure uniqueness
        uniqueProducts[dataPro[i].title.toLowerCase()] = dataPro[i];
    }

    let table = '';
    let index = 0;

    // Iterate through the unique products
    for (const key in uniqueProducts) {
        if (uniqueProducts.hasOwnProperty(key)) {
            const product = uniqueProducts[key];
            // Display each product only once
            table += `
                <tr>
                    <td>${index + 1}</td>
                    <td>${product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.taxes}</td>
                    <td>${product.ads}</td>
                    <td>${product.discount}</td>
                    <td>${product.total}</td>
                    <td>${product.count}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td><img src="${product.image}" alt="${product.title}" width="100"></td>
                    <td><button onclick="updateData(${index})" class="update">update</button></td>
                    <td><button onclick="deleteData(${index})" class="delete">delete</button></td>
                </tr>`;
            index++;
        }
    }

    document.getElementById('tbody').innerHTML = table;

    let deleteButton = document.getElementById('deleteAll');
    deleteButton.innerHTML = `
        <button onclick="deleteAll()">Delete All(${Object.keys(uniqueProducts).length})</button>`;

    getTotal();
}
showData()

//delete
function deleteData(i) {
    dataPro.splice(i, 1);
    localStorage.product = JSON.stringify(dataPro);
    showData()
}

// deleteAll
function deleteAll() {
    localStorage.clear();
    dataPro.splice(0);
    showData();
}

//update
function updateData(i) {
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes;
    ads.value = dataPro[i].ads;
    discount.value = dataPro[i].discount;
    getTotal()
    count.style.display = 'none';
    description.value = dataPro[i].description;
    category.value = dataPro[i].category;
    document.getElementById('imageSource').value = dataPro[i].image;
    submit.innerHTML = 'Update';
    statue = 'update';

    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',

    })
}
//search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id == 'searchTitle') {
        searchMood = 'title';


    } else {
        searchMood = 'category';

    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus()
    search.value = '';

    showData()

}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataPro.length; i++) {
        if (searchMood == 'title') {

            if (dataPro[i].title.includes(value.toLowerCase())) {
                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataPro[i].title}</td>
                        <td>${dataPro[i].price}</td>
                        <td>${dataPro[i].taxes}</td>
                        <td>${dataPro[i].ads}</td>
                        <td>${dataPro[i].discount}</td>
                        <td>${dataPro[i].total}</td>
                        <td>${dataPro[i].count}</td>
                        <td>${dataPro[i].description}</td>
                        <td>${dataPro[i].category}</td>
                        <td><img src="${dataPro[i].image}" alt="${dataPro[i].title}" width="100"></td>
                        <td><button onclick="updateData(${i})" class="update">update</button></td>
                        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                    </tr>`;

            }



        } else {

            if (dataPro[i].category.includes(value.toLowerCase())) {
                table += `
                        <tr>
                            <td>${i}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].count}</td>
                            <td>${dataPro[i].description}</td>
                            <td>${dataPro[i].category}</td>
                            <td><img src="${dataPro[i].image}" alt="${dataPro[i].title}" width="100"></td>
                            <td><button onclick="updateData(${i})" class="update">update</button></td>
                            <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
                        </tr>`;

            }

        }
    }

    document.getElementById('tbody').innerHTML = table;
}


// Validation functions
function validateTitle() {
    let titleValue = title.value.trim();
    let titleError = document.getElementById('title-error');

    if (titleValue === '') {
        titleError.textContent = 'Please enter a title.';
        return false;
    } else {
        titleError.textContent = '';
        return true;
    }
}

function validatePrice() {
    let priceValue = price.value.trim();
    let priceError = document.getElementById('price-error');

    if (priceValue === '' || isNaN(parseFloat(priceValue))) {
        priceError.textContent = 'Please enter a valid price.';
        return false;
    } else {
        priceError.textContent = '';
        return true;
    }
}

function validateDescription() {
    let descriptionValue = description.value.trim();
    let descriptionError = document.getElementById('description-error');

    if (descriptionValue === '') {
        descriptionError.textContent = 'Please enter a description.';
        return false;
    } else {
        descriptionError.textContent = '';
        return true;
    }
}

function validateCategory() {
    let categoryValue = category.value.trim();
    let categoryError = document.getElementById('category-error');

    if (categoryValue === '') {
        categoryError.textContent = 'Please enter a category.';
        return false;
    } else {
        categoryError.textContent = '';
        return true;
    }
}

// Update the submit.onclick function to include validation
submit.onclick = function() {
    // Validate each input
    let isTitleValid = validateTitle();
    let isPriceValid = validatePrice();
    let isDescriptionValid = validateDescription();
    let isCategoryValid = validateCategory();

    // Check if all validations pass
    if (isTitleValid && isPriceValid && isDescriptionValid && isCategoryValid) {
        // Continue with the rest of the code if all validations pass



        let newPro = {
            id: productIdCounter,
            inCart: inCart,
            title: title.value.toLowerCase(),
            price: price.value,
            taxes: taxes.value,
            ads: ads.value,
            discount: discount.value,
            total: total.innerHTML,
            count: count.value,
            description: description.value,
            category: category.value.toLowerCase(),
            image: document.getElementById('imageSource').value || 'title',
        };
        productIdCounter++;
        // Clean data and save to local storage
        if (statue === 'create') {
            if (newPro.count > 1) {
                // for (let i = 0; i < newPro.count; i++) {
                    dataPro.push(newPro);
                // }
            } else {
                dataPro.push(newPro);
            }
        } else {
            dataPro[tmp] = newPro;
            statue = 'create';
            submit.innerHTML = 'Create';
            count.style.display = 'block';
        }

        clearData();

        // Save to local storage and update UI
        localStorage.setItem('product', JSON.stringify(dataPro));
        showData();
    }
};