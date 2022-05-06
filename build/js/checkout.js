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
    formSelection();
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
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <div class="checkoutItem__btns">
                        <button class="remove__button">Remove Item</button>
                    </div>
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
    const cartItemsContainer = document.getElementsByClassName('items__container')[0];
    const cartItems = cartItemsContainer.getElementsByClassName('checkout__item');
    const subtotalShipping = document.querySelector('.subtotal__shipping');
    const subtotalTax = document.querySelector('.subtotal__tax');
    const subTotal = document.querySelector('.subtotal__price');

    var total = 0;
    var subtotal = 0;
    var shipping = 0;
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i];

        var priceElement = cartItem.getElementsByClassName('checkoutItem__price')[0];
        var price = parseFloat(priceElement.innerHTML.replace('£', ''));

        subtotal = subtotal + price;
    }

    
    if (subtotal > 50) {
        subtotalShipping.innerHTML = '£0.00';
    } else {
        subtotalShipping.innerHTML = '£3.99';
        var shipping = 3.99;
    }
    console.log(shipping)

    var tax = parseInt((subtotal * 0.05).toFixed(2));
    subtotalTax.innerHTML = '£' + tax;

    console.log(tax)
    subtotal = Math.round(subtotal * 100) / 100;
    console.log(subtotal)
    
    subTotal.innerHTML = '£' + (subtotal.toFixed(2))
    var total = (tax + shipping + subtotal);
    
    document.getElementsByClassName('basket__total')[0].innerHTML = '£' + total;
}

// BUTTONS

const submitButton = document.getElementById('submitBtn');
submitButton.onclick = () => {
    submitButton.classList.toggle('button--loading');
    progress.style.width = "100%";
    setTimeout(submitOrder, 2500);
}

// PROGRESS BAR 

const progress = document.getElementById('progress');

// SCROLL TO TOP

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        scrolling: false,
    })
}

// CHECKOUT FORMS

const formSelection = () => {
    const forms = document.querySelectorAll('.checkout__form');
    const containerHeight = document.querySelector('.checkout__form');
    forms[0].classList.add('form__section', 'fade-in');
    const placeOrder = document.querySelector('.order__btn');
    const subTotal = document.querySelector('.subtotal__container');

    firstFormHeight = forms[0].clientHeight;
    secondFormHeight = forms[1].clientHeight;
    console.log(firstFormHeight)

    containerHeight.style.height = `${firstFormHeight}px`;
    
    console.log(containerHeight.clientHeight)
    const nextOne = document.getElementById('Next1');
    const backOne = document.getElementById('Back1');

    nextOne.onclick = () => {
        forms[0].classList.remove('form__section', 'fade-in');
        containerHeight.style.height = `${secondFormHeight}px`;
        forms[1].classList.add('form__section', 'fade-in');
        subTotal.style.display = 'block';
        subTotal.style.opacity = '1';
        progress.style.width = "66%";
        placeOrder.style.opacity = '1'
        placeOrder.style.pointerEvents = 'all'
        scrollToTop();
    }
    backOne.onclick = () => {
        forms[0].classList.add('form__section', 'fade-in');
        containerHeight.style.height = `${firstFormHeight}px`;
        forms[1].classList.remove('form__section', 'fade-in');
        progress.style.width = "33%";
        scrollToTop();
    }
}

// GET DELIVERY DATE

const addDays = (originalDate, days) => {
    cloneDate = new Date(originalDate.valueOf());
    cloneDate.setDate(cloneDate.getDate() + days);
    return cloneDate;
}

// SUBMIT ORDER

const submitOrder = () => {

    const basketItems = JSON.parse(sessionStorage.getItem('basket'));

    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const fullName = firstName + ' ' + lastName;

    const address = document.getElementById('address').value;

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

    const orderDetails = {
        ...orderDets,
        orderItems: basketItems
    };
    
    const orders = JSON.parse(localStorage.getItem('orders'))
    orders.push(orderDetails)
    sessionStorage.clear('basket');
    localStorage.setItem(`orders`, JSON.stringify(orders));

    checkoutComplete();
}

    const checkoutComplete = () => {
    window.document.location = "../index.html";

    const message = `Thanks! Your order as now been placed`;
    console.log(message)

    showToast(message);
}
