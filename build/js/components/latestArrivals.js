if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)
} else { 
    ready()
}


function ready() {
    const productItems = document.getElementsByClassName('arrival__image')
    for (var i = 0; i < productItems.length; i++) {
        var item = productItems[i]
        item.addEventListener('click', addProductDetails)
    }
}

class LatestArrivals extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="latest">
        <h1>Check out the latest arrivals</h1>
        <div class="more__container">
            <div class="arrival latest__item">
                <img class="arrival__image" src="../assets/nike/shorts/nikeshorts1.svg" alt="" />
                <h4 class="arrival__name">Mens French Terry Shorts</h1>
                <p class="arrival__price">£49.95</p>
                <div class="alt__images item__gallery">
                    <img src="../assets/nike/shorts/nikeshorts2.svg" alt="" />
                    <img src="../assets/nike/shorts/nikeshorts3.svg" alt="" />
                    <img src="../assets/nike/shorts/nikeshorts4.svg" alt="" />
                    <img src="../assets/nike/shorts/nikeshorts5.svg" alt="" />
                </div>
            </div>
            <div class="arrival latest__item">
                <img class="arrival__image" src="../assets/converse/pullover/pullover1.svg" alt="" />
                <h4 class="arrival__name">Renew Graphic Crew</h1>
                <p class="arrival__price">£39.99</p>
                <div class="alt__images item__gallery">
                    <img src="../assets/converse/pullover/pullover2.svg" alt="" />
                    <img src="../assets/converse/pullover/pullover3.svg" alt="" />
                    <img src="../assets/converse/pullover/pullover4.svg" alt="" />
                    <img src="../assets/converse/pullover/pullover5.svg" alt="" />
                </div>
            </div>
            <div class="arrival latest__item">
                <img class="arrival__image" src="../assets/vans/teetwo/vanstee1.svg" alt="" />
                <h4 class="arrival__name">Mascd Mind T-Shirt</h1>
                <p class="arrival__price">£40.00</p>
                <div class="alt__images item__gallery">
                    <img src="../assets/vans/teetwo/vanstee2.svg" alt="" />
                    <img src="../assets/vans/teetwo/vanstee3.svg" alt="" />
                    <img src="../assets/vans/teetwo/vanstee4.svg" alt="" />
                    <img src="../assets/vans/teetwo/vanstee5.svg" alt="" />
                </div>
            </div>
            <div class="arrival latest__item">
                <img class="arrival__image" src="../assets/vans/footwear/shadow/shadowvans1.svg" alt="" />
                <h4 class="arrival__name">Shadow SK8-Hi Shoes</h1>
                <p class="arrival__price">£80.00</p>
                <div class="alt__images item__gallery">
                    <img src="../assets/vans/footwear/shadow/shadowvans2.svg" alt="" />
                    <img src="../assets/vans/footwear/shadow/shadowvans3.svg" alt="" />
                    <img src="../assets/vans/footwear/shadow/shadowvans4.svg" alt="" />
                    <img src="../assets/vans/footwear/shadow/shadowvans5.svg" alt="" />
                </div>
            </div>
        </div>
        </div>
        

    `;
    }
}

window.customElements.define('latest-arrivals', LatestArrivals);

// PRODUCT CLICKED

const addProductDetails = (event) => {
    var clicked = event.target
    var product = clicked.parentElement
    var name = product.getElementsByClassName('arrival__name')[0].innerText
    var price = product.getElementsByClassName('arrival__price')[0].innerText
    var image = product.getElementsByClassName('arrival__image')[0].src

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