if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

function ready() {

    const addToCartButtons = document.getElementsByClassName('add__button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    getProductDetails()
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
            productInfo.push(product)
        }
    }

    const productName = document.querySelector('.item__name')
    const productImage = document.querySelector('.item__image')
    const productPrice = document.querySelector('.item__price')

    productName.innerHTML = productInfo[0].name
    productImage.src = productInfo[0].image
    productPrice.innerHTML = productInfo[0].price
    
}
