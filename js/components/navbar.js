const basketItems = JSON.parse(sessionStorage.getItem('basket'));
console.log(basketItems.length)

class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar">
            <div class="nav__sale">
                <h4>SALE ENDS IN 
                    <span class="timer"></span>
                </h4>
            </div>
            <div class="nav__container">
                <div class="nav">
                    <div class="navbar__menu">
                        <div class="nav__toggle" id="mobile-menu">
                            <span class="bar"></span>
                            <span class="bar"></span>
                            <span class="bar"></span>
                        </div>
                        <div class="nav__search">
                            <img class="search__icon" src="../assets/navbar/search.png" alt="" />
                            <input required type="text" spellcheck="false" placeholder="Search..." />
                        </div>
                    </div>
                    <a href="/html/main.html" id="nav__logo">MARQUET</a>
                    <div class="nav__icons">
                        <a href="/html/basket.html">
                            <img class="shopping__icon" src="../assets/navbar/shopping-bag.png" alt="" />
                        </a>
                        <img class="account__icon" src="../assets/navbar/account.png" alt="" />
                    </div>
                </div>
                <div class="nav__secondary">
                    <ul class="nav__menu">
                        <div class="mobile__logoContainer">
                            <svg class="mobile__logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 340"><rect width="350" height="340" fill="#000000"/><path d="M225.59,240.57h39.46l49.72,138.11q4.74,13.43,9.28,27t9.27,27h1.58q4.73-13.41,8.88-27t8.88-27l48.93-138.11h39.85V499.43H410.66V357q0-17.36,1.58-38.28T415,280.43h-1.58L392.9,339.22,344,473.38h-21.7L273.34,339.22l-20.52-58.79h-1.58q1.19,17.35,2.57,38.27T255.19,357V499.43h-29.6Z" transform="translate(-155 -200)" fill="#fff"/>
                            </svg>
                        </div>
                        <li class="navbar__item">
                            <a href="/html/mens.html" class="navbar__links">Mens</a>
                        </li>
                        <li class="navbar__item">
                            <a href="/html/womens.html" class="navbar__links">Womens</a>
                        </li>
                        <li class="navbar__item">
                            <a href="/html/footwear.html" class="navbar__links">Footwear</a>
                        </li>
                        <li class="navbar__item">
                            <a href="/html/homeware.html" class="navbar__links">Homeware</a>
                        </li>
                        <li class="navbar__item">
                            <a href="/html/accessories.html" class="navbar__links">Accessories</a>
                        </li>
                        <div class="mobile__bottom">
                            <p>My account</p>
                            <p>Contact us</p>
                        </div>
                    </ul>
                </div>
            </div>
        </nav>
        <div class="divider__top">
            <span></span>
        </div>
    `;
    }
}

window.customElements.define('marquet-nav', Navbar);

