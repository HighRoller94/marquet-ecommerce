if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}


// MOBILE MENU

const menu = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".side__menu");

const mobileMenu = () => {
    menu.classList.toggle('active')
    navMenu.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// CURRENT URL LOCATION

const currentLocation = location.href;
const menuItem = document.querySelectorAll('.navbar__item');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.toggle("active")
    }
}

// COUNTDOWN TIMER

const countdown = () => {
    const currentDate = new Date().getTime();
    const countDate = new Date('September 15, 2022 00:00:00').getTime();
    
    const diff = countDate - currentDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(diff / day);
    const textHour = Math.floor((diff % day) / hour);
    const textMinute = Math.floor((diff % hour) / minute);
    const textSecond = Math.floor((diff % minute) / second);

    const outputHours = (textHour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const outputMinutes = (textMinute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const outputSeconds = (textSecond).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

    const timer = document.querySelectorAll('.timer');
    timer.forEach(time => {
        time.innerHTML = outputHours + ':' + outputMinutes + ':' + outputSeconds;
    })
}

setInterval(countdown, 1000);

// SHOPPING CART FUNCTIONALITY

function ready() {

    if (sessionStorage.getItem('basket') == null) {
        sessionStorage.setItem('basket', '[]');
    }
    
    if (sessionStorage.getItem('productDetails') == null) {
        sessionStorage.setItem('productDetails', '[]');
    }


    const addToCartButtons = document.getElementsByClassName('add__button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    const productItems = document.getElementsByClassName('item__image')
    for (var i = 0; i < productItems.length; i++) {
        var button = productItems[i]
        button.addEventListener('click', addProductDetails)
    }

    getBasketCount()
}

// GET NUMBER OF ITEMS IN BASKET 

const getBasketCount = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    const countText = document.querySelector(".basket__count");
    const basketIcon = document.querySelector(".shopping__icon")
    if (basketItems.length === 0) {
        countText.innerHTML = ''
    } else {
        countText.innerHTML = basketItems.length
    }
    
}

// ADD TO CART

const addToCartClicked = (event) => {
    var button = event.target
    var shopItem = button.parentElement
    var name = shopItem.getElementsByClassName('item__name')[0].innerText
    var price = shopItem.getElementsByClassName('item__price')[0].innerText
    var image = shopItem.getElementsByClassName('item__image')[0].src

    var item = { name: `${name}`, price: `${price}`, image: `${image}`, quantity: '1'}
    addItemToCart(item)
}

const addItemToCart = (item) => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    basketItems.push(item)
    sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
    getBasketCount()
}

// PRODUCT CLICKED

const addProductDetails = (event) => {
    var clicked = event.target
    var product = clicked.parentElement
    var name = product.getElementsByClassName('item__name')[0].innerText
    var price = product.getElementsByClassName('item__price')[0].innerText
    var image = product.getElementsByClassName('item__image')[0].src

    var product = { name: `${name}`, price: `${price}`, image: `${image}`}
    
    const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
    productDetails.push(product)
    sessionStorage.setItem(`productDetails`, JSON.stringify(productDetails));

    pushProductPage(name)
}

const pushProductPage = (name) => {
    window.document.location = './details.html' + '?' + `${name}`;
}