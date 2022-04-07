if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {

    if (localStorage.getItem('orders') == null) {
        localStorage.setItem('orders', '[]');
    }
        
    const removeCartItemButtons = document.getElementsByClassName('remove__button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem);
    }

    retrieveBasket();
    updateCartTotal();
}

// GET BASKET ITEMS 

const retrieveBasket = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];

    basketItems.forEach(item => {
        var itemContainer = document.createElement('div');
        var itemContents =
            `<div class="checkout__item">
                <div class="checkout__imageContainer">
                    <img class="checkout__itemImage" src=${item.image} alt="" />
                </div>
                <div class="checkoutItem__info">
                    <h4 class="checkoutItem__name">${item.name}</h4>
                    <p class="checkoutItem__price">${item.price}</p>
                    <div class="quantity">
                        <p>Quantity:</p>
                        <p>${item.quantity}</p>
                    </div>
                    <button class="remove__button">Remove from Basket</button>
                </div>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })
}

// REMOVE CHECKOUT ITEM

const removeCartItem = (event) => {
    var button = event.target
    button.parentElement.parentElement.remove()
    var shopItem = button.parentElement.parentElement.parentElement
    var name = shopItem.getElementsByClassName('basketItem__name')[0].innerText
    console.log('removed' + name)
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    // iterate over the current basket
    basketItems.forEach(item => {
        // get the index of the item in the array that we want to remove, based on its name (key)
        if (item.name == `${name}`) {
            const index = basketItems.indexOf(item)
            if (index > -1) {
                // remove said item from the array and then update the basket
                basketItems.splice(index, 1)
                sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
            }
        }
    })
    console.log(basketItems)

    updateCartTotal();
    getBasketCount();
    counterText();
}

const updateCartTotal = () => {
    const cartItemsContainer = document.getElementsByClassName('items__container')[0]
    const cartItems = cartItemsContainer.getElementsByClassName('checkout__item')
    var total = 0
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]

        var priceElement = cartItem.getElementsByClassName('checkoutItem__price')[0]

        var price = parseFloat(priceElement.innerHTML.replace('£', ''))

        total = total + price
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket__total')[0].innerHTML = '£' + total
}


// FORMS

const firstForm = document.getElementById('firstForm');
const secondForm = document.getElementById('secondForm');
const thirdForm = document.getElementById('thirdForm');

// BUTTONS

const nextOne = document.getElementById('Next1');
const nextTwo = document.getElementById('Next2');
const backOne = document.getElementById('Back1');
const backTwo = document.getElementById('Back2');


const submitButton = document.getElementById('submitBtn');
submitButton.onclick = () => {
    submitButton.classList.toggle('button--loading')
    setTimeout(submitOrder, 2000);
}

// PROGRESS BAR 

const progress = document.getElementById('progress');

// ON CLICKS

nextOne.onclick = () => {
    firstForm.style.left = "-100%";
    secondForm.style.left = "7.5%";
    progress.style.width = "66%";
}

backOne.onclick = () => {
    firstForm.style.left = "7.5%";
    secondForm.style.left = "110%";
    progress.style.width = "33%";
}

nextTwo.onclick = () => {
    secondForm.style.left = "-100%";
    thirdForm.style.left = "7.75%";
    progress.style.width = "100%";
}

backTwo.onclick = () => {
    secondForm.style.left = "7.5%";
    thirdForm.style.left = "110%";
    progress.style.width = "66%";
}


// GET DELIVERY DATE

const addDays = (originalDate, days) => {
    cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
}

// SUBMIT ORDER

const submitOrder = () => {

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;

    const fullName = firstName + ' ' + lastName;

    const address = document.getElementById('address').value;
    const county = document.getElementById('county');
    const country = document.getElementById('country');

    const orderPrice = document.getElementsByClassName('basket__total')[0].textContent;
    const timeSubmitted = new Date().toLocaleDateString();

    let today = new Date();
    const deliveryDate = addDays(today, 3);

    const randomNumberOne = Math.ceil(Math.random() * (1000, 9999));
    const randomNumberTwo = Math.ceil(Math.random() * (10000, 99999));
    const orderNumber = randomNumberOne + '-' + randomNumberTwo;

    const orderDets = { 
        name: `${fullName}`, 
        dateSubmitted: `${timeSubmitted}`, 
        deliveryDate: `${deliveryDate.toLocaleDateString()}`,
        orderNumber: `${orderNumber}`, 
        orderPrice: `${orderPrice}`, 
        orderAddress: `${address}`
    }

    const basketItems = JSON.parse(sessionStorage.getItem('basket'));

    const orderDetails = {
        ...orderDets,
        orderItems: basketItems
    };
    
    const orders = JSON.parse(localStorage.getItem('orders'))
    orders.push(orderDetails)
    sessionStorage.clear('basket');
    sessionStorage.setItem('recentOrders', JSON.stringify(orders))
    localStorage.setItem(`orders`, JSON.stringify(orders));

    window.document.location = "/html/confirmation.html";
}

// ADJUST FORM HEIGHT BASED ON CHILD HEIGHT

const parent = document.querySelector('.checkout__container')
const children = parent.children;

let largestExtent = 0

for (var i = 0; i < children.length; i++) {
    let extent = children[i].offsetHeight + children[i].offsetTop
    if (extent > largestExtent) largestExtent = extent
}

parent.style.height = `${largestExtent + 20}px`