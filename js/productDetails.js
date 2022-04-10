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

    const removeButton = document.querySelector('.remove__button');
    removeButton.addEventListener('click', removeCartItem);

    getBasketCount();
    getProductDetails();
    scrollThroughImages();
    
}


const productInfo = [];

const getProductDetails = () => {
    // Get product details from session storage
    const productDetails = JSON.parse(sessionStorage.getItem('productDetails'));
    // Get the params from the URL (item name), and clean it
    const paramsNameUncleaned = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0];
    const paramsName = paramsNameUncleaned.replace(/%20/g, ' ');
    // Loop over items in productDetails array, if URL params = product name 
    for (let i = 0; i < productDetails.length; i++) {
        let product = productDetails[i];
        if (product.name === paramsName) {
            productInfo.push(product);
        }
    }
    const productName = document.querySelector('.item__name');
    const productImage = document.querySelector('.item__image');
    const productPrice = document.querySelector('.item__price');
    const klarnaPrice = document.querySelector('.klarna__statement');
    const galleryContainer = document.querySelector('.item__gallery');
    const productGallery = productInfo[0].gallery;

    productGallery.forEach(image => {
        const img = document.createElement('img');
        img.src = image;
        img.id = image;
        galleryContainer.appendChild(img)
    })
    
    productName.innerHTML = productInfo[0].name;
    productImage.src = productInfo[0].image;
    productPrice.innerHTML = productInfo[0].price;
    
    var price = parseFloat(productPrice.innerHTML.replace('£', ''));
    var klarna = Math.floor((price / 3) * 100);
    const klarnaSplit = klarna / 100;

    klarnaPrice.innerHTML = '£' + klarnaSplit;
    checkProduct();

}

// CHECK IF PRODUCT IS IN CART AND CHANGE BUTTONS

const checkProduct = () => {
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    const productName = document.querySelector('.item__name').innerHTML;

    for (let i = 0; i < basketItems.length; i++) {
        const itemName = basketItems[i].name
        if (productName === itemName) {
            const addButton = document.querySelector('.add__button');
            const removeButton = document.querySelector('.remove__button');
            const removeText = document.querySelector('.remove__text');
            addButton.style.display = 'none';
            removeButton.style.display = 'block';
            removeText.style.display = 'flex';
        }
    }
}

// PRODUCT IMAGES 

const scrollThroughImages = () => {
    const mainImage = document.getElementById('item__image');
    const images = document.getElementsByClassName('item__gallery')[0];
    for (let i = 0; i < images.children.length; i++) {
        const image = images.children[i]
        const imageSrc = images.children[i].src
        image.addEventListener("click", function() {
            mainImage.src = imageSrc
        })
    }
}

// ADD ITEM TO BASKET

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
    checkProduct(item);
    getBasketCount();
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

// REMOVE ITEM FROM CART

const removeCartItem = () => {

    var name = document.getElementsByClassName('item__name')[0].innerText
    const basketItems = JSON.parse(sessionStorage.getItem('basket'));
    // iterate over the current basket
    basketItems.forEach(item => {
        // get the index of the item in the array that we want to remove, based on its name (key)
        if (item.name == `${name}`) {
            const index = basketItems.indexOf(item)
            if (index > -1) {
                // remove said item from the array and then update the basket
                console.log('removed' + name)
                basketItems.splice(index, 1)
                sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
                const addButton = document.querySelector('.add__button');
                const removeButton = document.querySelector('.remove__button');
                const removeText = document.querySelector('.remove__text');
                removeButton.style.display = 'none';
                removeText.style.display = 'none';
                addButton.style.display = 'block';
            }
        }
    })
    console.log(basketItems)
    
    getBasketCount();
}