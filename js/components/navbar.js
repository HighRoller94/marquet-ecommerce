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
                            <input required type="text" spellcheck="false" placeholder="SEARCH" />
                        </div>
                    </div>
                    <a href="/html/main.html" id="nav__logo">MARQUET</a>
                    <div class="nav__icons">
                        <img class="shopping__icon" src="../assets/navbar/shopping-bag.png" alt="" />
                        <img class="account__icon" src="../assets/navbar/account.png" alt="" />
                    </div>
                </div>
                <div class="nav__secondary">
                    <ul class="nav__menu">
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

