if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}

// HERO CAROUSEL

const loadCarousel = () => {
    const carouselContainer = document.querySelector('.hero__carousel');

    document.querySelectorAll('.hero__carousel').forEach(carousel => {
    // Generate the html for each of the carousel divs we have
    const items = carousel.querySelectorAll('.carousel__div');
    const buttonsHtml = Array.from(items, () => {
        return `<span class="carousel__btn"></span>`;
    })

    // Append the carousel nav to the end of the carousal div container
    carousel.insertAdjacentHTML('beforeend', `
    <div class="carousel__nav">
        ${buttonsHtml.join('')}
    </div>
    `)
    
    const buttons = carousel.querySelectorAll('.carousel__btn');
    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            // Unselect any current carousel divs/buttons
            items.forEach(item => 
                item.classList.remove('carousel__selected', 'fade-in'));
            buttons.forEach(button => 
                button.classList.remove('selected', 'fade-in' ));
            // Select and add class to selected carousel and button
            items[i].classList.add('carousel__selected', 'fade-in');
            button.classList.add('selected', 'fade-in');
        })
    })
    
    // Select the first carousel div to display
    items[1].classList.add('carousel__selected', 'fade-in');
    buttons[0].classList.add('selected', 'fade-in');

    var timer;
    var slideIndex = 1;
    showSlides(slideIndex);

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    function showSlides(n) {
        let i;
        const slides = document.querySelectorAll('.carousel__div');
        if (n > slides.length) {
            slideIndex = 1
        }
        if (n < 1) {
            slideIndex = slides.length
        }
        for (i = 0; i < slides.length; i++) {
            slides[i].classList.remove('fade-in')
        }
        slides[slideIndex - 1].classList.add('fade-in')
            clearTimeout(timer);
        timer = setTimeout(() => plusSlides(1), 8000);
    }
    })
}



// SHOPPING CART FUNCTIONALITY

function ready() {

    if (sessionStorage.getItem('basket') == null) {
        sessionStorage.setItem('basket', '[]');
    }
    
    if (sessionStorage.getItem('productDetails') == null) {
        sessionStorage.setItem('productDetails', '[]');
    }


    const addToCartButtons = document.getElementsByClassName('add__button')
    for (var i = 0; i < addToCartButtons.length; i++) {
        var button = addToCartButtons[i]
        button.addEventListener('click', addToCartClicked)
    }

    const productItems = document.getElementsByClassName('item__image')
    for (var i = 0; i < productItems.length; i++) {
        var item = productItems[i]
        item.addEventListener('click', addProductDetails)
    }

    loadCarousel();
    
    toastNotification();
    getBasketCount();
}

// GET NUMBER OF ITEMS IN BASKET 

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

// ADD TO CART

const addToCartClicked = (event) => {
    var button = event.target
    var shopItem = button.parentElement
    var name = shopItem.getElementsByClassName('item__name')[0].innerText
    var price = shopItem.getElementsByClassName('item__price')[0].innerText
    var image = shopItem.getElementsByClassName('item__image')[0].src

    var gallery = shopItem.getElementsByClassName('item__gallery')[0]
    const galleryImages = []
    for (let i = 0; i < gallery.children.length; i++) {
        galleryImages.push(gallery.children[i].currentSrc)
    }

    var item = { name: `${name}`, price: `${price}`, image: `${image}`, quantity: '1', gallery: galleryImages}
    addItemToCart(item);
}

const addItemToCart = (item) => {
    var basketItems = JSON.parse(sessionStorage.getItem('basket'));
    for (let i = 0; i < basketItems.length; i++) {
        const basketItem = basketItems[i]
        if (basketItem.name === item.name) {
            const message = `${basketItem.name} is already in your basket`;
            showToast(message);
            return;
        }
    }
    const message = `${item.name } has been added to your basket`;
    basketItems.push(item)
    sessionStorage.setItem(`basket`, JSON.stringify(basketItems));
    showToast(message);
    getBasketCount();
}

// PRODUCT CLICKED

const addProductDetails = (event) => {
    var clicked = event.target
    var product = clicked.parentElement
    var name = product.getElementsByClassName('item__name')[0].innerText
    var price = product.getElementsByClassName('item__price')[0].innerText
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

const pushProductPage = (name) => {
    window.document.location = './details.html' + '?' + `${name}`;
}

// TOAST NOTIFICATIONS

const toastNotification = () => {
    const navbar = document.querySelector('.nav');
    const notification = document.createElement('div');
    notification.hideTimeOut = null;
    notification.className = 'toast';
    navbar.appendChild(notification);
}

const showToast = (message) => {
    const notification = document.querySelector('.toast');
    clearTimeout(notification.hideTimeout);

    notification.textContent = message;
    notification.className = 'toast toast-visible';

    notification.hideTimeout = setTimeout(() => {
        notification.classList.remove('toast-visible')
    }, 3000)
}
