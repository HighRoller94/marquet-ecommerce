if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    retrieveBasket();

    const removeCartItemButtons = document.getElementsByClassName('remove__button');
    for (var i = 0; i < removeCartItemButtons.length; i++) {
        var button = removeCartItemButtons[i]
        button.addEventListener('click', removeCartItem);
    }
    
    const quantityInputs = document.getElementsByClassName('item__quantity')
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }
    
    
}

// RETRIEVE AND DISPLAY BASKET ITEMS 

const retrieveBasket = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];
    basketItems.forEach(item => {
        var itemContainer = document.createElement('div');
        var itemContents =
            `<div class="item">
                <img class="item__image"src=${item.image} alt="" />
                <h4 class="item__name">${item.name}</h4>
                <p class="item__price">${item.price}</p>
                <input class="item__quantity" type="number" value=${item.quantity}>
                <button class="remove__button">Remove from Basket</button>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })
    updateCartTotal()
    console.log(basketItems)
}

// REMOVE BASKET ITEM

const removeCartItem = (event) => {
    var button = event.target
    button.parentElement.remove()
    var shopItem = button.parentElement
    var name = shopItem.getElementsByClassName('item__name')[0].innerText
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
    updateCartTotal()
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
    const cartItems = cartItemsContainer.getElementsByClassName('item')
    var total = 0
    for (var i = 0; i < cartItems.length; i++) {
        var cartItem = cartItems[i]

        var priceElement = cartItem.getElementsByClassName('item__price')[0]
        var quantityElement = cartItem.getElementsByClassName('item__quantity')[0]

        var price = parseFloat(priceElement.innerHTML.replace('£', ''))
        var quantity = quantityElement.value

        total = total + (price * quantity)
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('basket__total')[0].innerHTML = '£' + total
}