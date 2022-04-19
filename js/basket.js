if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    retrieveBasket();
    toggleCheckout();
    var removeCartItemButtons = document.getElementsByClassName('remove__button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i];
        button.addEventListener('click', removeCartItem);
    }
    
    const quantityInputs = document.getElementsByClassName('basketItem__quantity');
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    const productItems = document.getElementsByClassName('item__image');
    const productNames = document.getElementsByClassName('basketItem__name');
    const viewButtons = document.getElementsByClassName('view__button');
    console.log(viewButtons)
    for (var i = 0; i < productItems.length; i++) {
        var item = productItems[i];
        item.addEventListener('click', getBasketItemDetails);
    }
    for (var i = 0; i < productNames.length; i++) {
        var item = productNames[i];
        item.addEventListener('click', getBasketItemDetails);
    }
    for (var i = 0; i < viewButtons.length; i++) {
        var item = viewButtons[i];
        item.addEventListener('click', getBasketItemDetails);
    }

}


// UPDATE COUNTER TEXT

const counterText = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    const counterText = document.getElementById('basket__counter');
    if (basketItems.length === 0) {
        counterText.innerHTML = 'You have no items in your basket';
    } else if (basketItems.length === 1) {
        counterText.innerHTML = 'You have 1 item in your basket';
    } else if (basketItems.length > 1) {
        counterText.innerHTML = `You have ${basketItems.length} items in your basket`;
    }
    const subCount = document.querySelector('.subtotal__count');
    if (basketItems.length === 1) {
        subCount.innerHTML = `(${basketItems.length} item):`;
    } else {
        subCount.innerHTML = `(${basketItems.length} items):`;
    }
}

// TOGGLE CHECKOUT BUTTON 

const toggleCheckout = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    const checkoutButton = document.getElementById('basket__checkout');
    if (basketItems.length === 0) {
        checkoutButton.href = '#'
        const button = checkoutButton.parentElement
        button.style.opacity = '0.4'
        button.style.pointerEvents = 'none'
    } 
    counterText();
}


// RETRIEVE AND DISPLAY BASKET ITEMS 

const retrieveBasket = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];
    console.log(basketItems)
    basketItems.forEach(item => {
        var itemContainer = document.createElement('div');
        var itemContents =
            `<div class="basket__item">
                <div class="basket__image">
                    <img class="item__image" src=${item.image} alt="" />
                </div>
                <div class="basketItem__info">
                    <h4 class="basketItem__name">${item.name}</h4>
                    <p class="basketItem__price">${item.price}</p>
                    <div class="quantity">
                        <p>Quantity:</p>
                        <input class="basketItem__quantity" type="number" value=${item.quantity}>
                    </div>
                    <div class="basketItem__btns">
                        <button class="remove__button">Remove Item</button>
                        <button class="view__button">View Item</button>
                    </div>
                </div>
                <div class="item__gallery">
                    <img src=${item.gallery[0]} alt="" />
                    <img src=${item.gallery[1]} alt="" />
                    <img src=${item.gallery[2]} alt="" />
                    <img src=${item.gallery[3]} alt="" />
                </div>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })

    var removeCartItemButtons = document.getElementsByClassName('remove__button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem);
    }

    const quantityInputs = document.getElementsByClassName('basketItem__quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    toggleCheckout();
    updateCartTotal();
}


// REMOVE BASKET ITEM

const removeCartItem = (event) => {
    var button = event.target;
    var shopItem = button.parentElement.parentElement;
    var name = shopItem.getElementsByClassName('basketItem__name')[0].innerText;
    console.log('removed' + name);
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];
    console.log(itemsContainer)
    itemsContainer.innerHTML = '';
    // iterate over the current basket
    basketItems.forEach(item => {
        // get the index of the item in the array that we want to remove, based on its name (key)
        if (item.name == `${name}`) {
            const index = basketItems.indexOf(item);
            if (index > -1) {
                // remove said item from the array and then update the basket
                basketItems.splice(index, 1)
                sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
            }
        }
    })
    retrieveBasket();
    getBasketCount();
}

// CHANGING QUANTITY

const quantityChanged = (event) => {
    var input = event.target
    console.log(input)
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1
    }
    console.log(input.value)
    updateCartTotal()
}

// BASKET TOTAL 

const updateCartTotal = () => {
    const cartItemsContainer = document.getElementsByClassName('items__container')[0]
    const cartItems = cartItemsContainer.getElementsByClassName('basket__item')
    var total = 0
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]

        var priceElement = cartItem.getElementsByClassName('basketItem__price')[0]
        var quantityElement = cartItem.getElementsByClassName('basketItem__quantity')[0]

        var price = parseFloat(priceElement.innerHTML.replace('£', ''))
        var quantity = quantityElement.value

        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    const rounded = total.toFixed(2);
    document.getElementsByClassName('basket__total')[0].innerHTML = '£' + rounded

    const klarnaPrice = document.querySelector('.klarna__statement');
    var klarna = Math.floor((total / 3) * 100);
    const klarnaSplit = klarna / 100;

    klarnaPrice.innerHTML = '£' + klarnaSplit;
}

// PRODUCT CLICKED

const getBasketItemDetails = (event) => {
    var clicked = event.target
    var product = clicked.parentElement.parentElement.parentElement
    var name = product.getElementsByClassName('basketItem__name')[0].innerText
    var price = product.getElementsByClassName('basketItem__price')[0].innerText
    var image = product.getElementsByClassName('item__image')[0].src

    var gallery = product.getElementsByClassName('item__gallery')[0]
    const galleryImages = []
    for (let i = 0; i < gallery.children.length; i++) {
        galleryImages.push(gallery.children[i].currentSrc)
    }
    var product = { name: `${name}`, price: `${price}`, image: `${image}`, quantity: '1', gallery: galleryImages}
    console.log(product)
    const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
    productDetails.push(product)
    sessionStorage.setItem(`productDetails`, JSON.stringify(productDetails));

    pushProductPage(name)
}
