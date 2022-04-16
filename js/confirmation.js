if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    const recentOrders = JSON.parse(sessionStorage.getItem('recentOrders'));
    const recentOrder = recentOrders.slice(-1);
    const orderItems = recentOrder[0].orderItems

    const subCount = document.querySelector('.subtotal__count');
    if (orderItems.length === 1) {
        subCount.innerHTML = `(${orderItems.length} item):`;
    } else {
        subCount.innerHTML = `(${orderItems.length} items):`;
    }

    retrieveRecentOrder();
}

// RETRIEVE RECENT ORDER 

const retrieveRecentOrder = () => {
    const recentOrders = JSON.parse(sessionStorage.getItem('recentOrders'));
    const recentOrder = recentOrders.slice(-1);
    console.log(recentOrder)
    var itemsContainer = document.getElementsByClassName('items__container')[0];
    const recentOrderItems = recentOrder[0].orderItems

    const orderNumber = document.getElementsByClassName('order__number')[0];
    const expectedDelivery = document.getElementsByClassName('expected__date')[0]
    const orderPrice = document.getElementsByClassName('confirmed__total')[0]

    expectedDelivery.innerHTML = recentOrder[0].deliveryDate;
    orderPrice.innerHTML = recentOrder[0].orderPrice;
    orderNumber.innerHTML = recentOrder[0].orderNumber;

    recentOrderItems.forEach(item => {
        var itemContainer = document.createElement('div');
        var itemContents =
            `<div class="confirmed__item">
                <div class="confirmed__image">
                    <img class="confirmedItem__image" src=${item.image} alt="" />
                </div>
                <div class="confirmedItem__info">
                    <h4 class="confirmedItem__name">${item.name}</h4>
                    <p class="confirmedItem__price">${item.price}</p>
                    <div class="confirmed__specs">
                        <p>Quantity: ${item.quantity}</p>
                    </div>
                    <button class="remove__button">View Item</button>
                </div>
            </div>`
        itemContainer.innerHTML = itemContents;
        itemsContainer.append(itemContainer);
    })
}

