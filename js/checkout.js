if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
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
}

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

// FORMS

const firstForm = document.getElementById('firstForm');
const secondForm = document.getElementById('secondForm');
const thirdForm = document.getElementById('thirdForm');

// BUTTONS

const nextOne = document.getElementById('Next1');
const nextTwo = document.getElementById('Next2');
const backOne = document.getElementById('Back1');
const backTwo = document.getElementById('Back2');

// PROGRESS BAR 

const progress = document.getElementById('progress');

// ON CLICKS

nextOne.onclick = () => {
    firstForm.style.left = "-100%";
    secondForm.style.left = "13%";
    progress.style.width = "240px";
}

backOne.onclick = () => {
    firstForm.style.left = "0";
    secondForm.style.left = "450px";
    progress.style.width = "120px";
}

nextTwo.onclick = () => {
    secondForm.style.left = "-100%";
    thirdForm.style.left = "13%";
    progress.style.width = "360px";
}

backTwo.onclick = () => {
    secondForm.style.left = "0";
    thirdForm.style.left = "450px";
    progress.style.width = "240px";
}