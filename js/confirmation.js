if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    retrieveBasket();
}

const retrieveBasket = () => {
    const recentOrder = JSON.parse(sessionStorage.getItem('recentOrders'));
    var itemsContainer = document.getElementsByClassName('items__container')[0];
    const recentOrderItems = recentOrder[0].orderItems

    const orderNumber = document.getElementsByClassName('order__number')[0]
    const orderPrice = document.getElementsByClassName('confirmed__total')[0]

    orderPrice.innerHTML = recentOrder[0].orderPrice;
    orderNumber.innerHTML = recentOrder[0].orderNumber;

    recentOrderItems.forEach(item => {
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
                    <button class="remove__button">View Item</button>
                </div>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })
}