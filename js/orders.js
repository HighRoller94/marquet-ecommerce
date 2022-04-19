if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {
    retrievePastOrders();
}

const retrievePastOrders = () => {
    const orders = JSON.parse(localStorage.getItem('orders'));
    const pastOrders = orders.reverse();
    
    pastOrders.forEach(order => {
        const index = pastOrders.indexOf(order)
        var itemsContainer = document.getElementsByClassName('orders')[0];
            var itemContainer = document.createElement('div');
            var itemContents =
                `<div class="order__container">
                    <div class="order">
                        <div class="order__date">
                            <p>Purchased on <strong>${order.dateSubmitted}</strong></p>
                        </div>
                        <div class="order__number">
                            <p>Order Number:<p>${order.orderNumber}</p></p>
                        </div>
                        <h2 class="order__delivery">Expected Delivery - ${order.deliveryDate}</h2>
                    <div class="order__items">
                    </div>
                    <div class="order__total">
                        <h2>Subtotal
                            <span class="subtotal__count">(${order.orderItems.length} items):</span>
                        </h2>
                        <h2 class="confirmed__total">${order.orderPrice}</h2>
                    </div>
                </div>` 
            itemContainer.innerHTML = itemContents;
            itemsContainer.append(itemContainer);
        
            getOrderProducts(order, index)

    })
    
}

const getOrderProducts = (order, index) => {
    const productsContainer = document.getElementsByClassName('order__items')
    const orderItems = order.orderItems
    
    for (var i = 0; i < productsContainer.length; i++) {
        let container = productsContainer[i]
        if (i === index ) {
            orderItems.forEach(item => {
                var productContainer = document.createElement('div');
                var productContents = 
                    `<div class="order__item">
                        <div class="order__image">
                            <img class="orderItem__image" src=${item.image} alt="" />
                        </div>
                        <div class="orderItem__info">
                            <h4 class="orderItem__name">${item.name}</h4>
                            <p class="orderItem__price">${item.price}</p>
                            <div class="quantity">
                                <p>Quantity: ${item.quantity}</p>
                            </div>
                            <button class="remove__button">View Item</button>
                        </div>
                    </div>`
                productContainer.innerHTML = productContents;
                container.append(productContainer);
            })
        }
    }
}