if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    retrieveBasket();
    counterText();
    toggleCheckout();
    const removeCartItemButtons = document.getElementsByClassName('remove__button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    
    const quantityInputs = document.getElementsByClassName('basketItem__quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
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
}


// UPDATE BASKET ITEMS 

// RETRIEVE AND DISPLAY BASKET ITEMS 

const retrieveBasket = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];

    basketItems.forEach(item => {
        var itemContainer = document.createElement('div');
        var itemContents =
            `<div class="basket__item">
                <div class="basket__image">
                <img class="basketItem__image" src=${item.image} alt="" />
                </div>
                <div class="basketItem__info">
                    <h4 class="basketItem__name">${item.name}</h4>
                    <p class="basketItem__price">${item.price}</p>
                    <div class="quantity">
                        <p>Quantity:</p>
                        <input class="basketItem__quantity" type="number" value=${item.quantity}>
                    </div>
                    <button class="remove__button">Remove from Basket</button>
                </div>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })
    updateCartTotal()
}


// REMOVE BASKET ITEM

const removeCartItem = (event) => {
    var button = event.target
    button.parentElement.parentElement.remove()
    var shopItem = button.parentElement
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
    toggleCheckout();
    counterText();
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
    document.getElementsByClassName('basket__total')[0].innerHTML = '£' + total
}
