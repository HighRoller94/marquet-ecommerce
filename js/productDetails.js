if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {

    const addToCartButtons = document.getElementsByClassName('add__button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i];
        button.addEventListener('click', addToCartClicked);
    }

    getBasketCount();
    getProductDetails();
}


const productInfo = [];

const getProductDetails = () => {
    // Get product details from session storage
    const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
    // Get the params from the URL (item name), and clean it
    const paramsNameUncleaned = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0];
    const paramsName = paramsNameUncleaned.replace(/%20/g, ' ');
    // Loop over items in productDetails array, if URL params = product name 
    for (let index = 0; index < productDetails.length; index++) {
        let product = productDetails[index];
        if (product.name === paramsName) {
            productInfo.push(product);
        }
    }

    const productName = document.querySelector('.item__name')
    const productImage = document.querySelector('.item__image')
    const productPrice = document.querySelector('.item__price')

    productName.innerHTML = productInfo[0].name;
    productImage.src = productInfo[0].image;
    productPrice.innerHTML = productInfo[0].price;
    
}

const addToCartClicked = (event) => {
    var button = event.target;
    var shopItem = button.parentElement.parentElement.parentElement;
    var name = shopItem.getElementsByClassName('item__name')[0].innerText;
    var price = shopItem.getElementsByClassName('item__price')[0].innerText;
    var image = shopItem.getElementsByClassName('item__image')[0].src;

    var item = { name: `${name}`, price: `${price}`, image: `${image}`, quantity: '1'};
    addItemToCart(item)
}

const addItemToCart = (item) => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    for (let i = 0; i < basketItems.length; i++) {
        const basketItem = basketItems[i]
        if (basketItem.name === item.name) {
            console.log(`${basketItem.name} is already in your basket`);
            return;
        }
    }
    basketItems.push(item)
    sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
    getBasketCount()
}

const getBasketCount = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    const countText = document.querySelector(".basket__count");
    const basketIcon = document.querySelector(".shopping__icon");
    if (basketItems.length === 0) {
        countText.innerHTML = ''
        basketIcon.src = '../assets/icons/emptyBag.svg'
    } else {
        countText.innerHTML = basketItems.length
        basketIcon.src = '../assets/icons/bagFull.svg'
    }
}