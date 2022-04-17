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
                    <div class="order__number">
                        <p> Order Number - <p>${order.orderNumber}</p></p>
                    </div>
                    <div class="order">
                        <div class="order__date">
                            <p>Purchased on <strong>${order.dateSubmitted}</strong></p>
                        </div>
                        <h2 class="order__delivery">Expected Delivery - ${order.deliveryDate}</h2>
                    <div class="order__items">
                    </div>
                    <h1 class="order__price">Total: ${order.orderPrice}</h2>
                </div>`
            itemContainer.innerHTML = itemContents;
            itemsContainer.append(itemContainer);
            
            getOrderProducts(order, index)
        
    })
    
}

const getOrderProducts = (order, index) => {
    console.log(order)
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
                                <p>Quantity:</p>
                                <input class="orderItem__quantity" type="number" value=${item.quantity}>
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