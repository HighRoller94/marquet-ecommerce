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
                    <div class="nav__toggle" id="mobile-menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <a href="/html/main.html" id="nav__logo">MARQUET</a>
                    <div class="side__menu">
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
                    <div class="nav__icons">
                        <a href="/html/basket.html">
                            <p class="basket__count"></p>
                            <svg class="shopping__icon" xmlns="http://www.w3.org/2000/svg" width="35.001" height="30.196" viewBox="0 0 35.001 30.196">
                                <path id="Icon_metro-shopping-basket" data-name="Icon metro-shopping-basket" d="M29.645,16.272,22.677,5.843a1.547,1.547,0,0,0-1.32-.676,1.567,1.567,0,0,0-1.32.676L13.068,16.272H5.447a1.6,1.6,0,0,0-1.591,1.591,1.868,1.868,0,0,0,.056.43L7.945,33.041a3.19,3.19,0,0,0,3.071,2.323H31.7a3.171,3.171,0,0,0,3.063-2.331l4.033-14.748a1.419,1.419,0,0,0,.064-.422,1.6,1.6,0,0,0-1.591-1.591H29.645Zm-13.062,0,4.773-7,4.773,7ZM21.356,29a3.182,3.182,0,1,1,3.182-3.182A3.181,3.181,0,0,1,21.356,29Z" transform="translate(-3.856 -5.167)"/>
                            </svg>
                        </a>
                        <img class="account__icon" src="../assets/navbar/account.png" alt="" />
                    </div>
                </div>
            </div>
        </nav>
    `;
    }
}

window.customElements.define('marquet-nav', Navbar);

