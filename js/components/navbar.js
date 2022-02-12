class Navbar extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <nav class="navbar">
            <div class="nav__sale">
                <h4>SALE ENDS IN 13:02:38</h4>
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
                    <a href="#home" id="nav__logo">MARQUET</a>
                    <div class="nav__icons">
                        <img class="shopping__icon" src="../assets/navbar/shopping-bag.png" alt="" />
                        <img class="account__icon" src="../assets/navbar/account.png" alt="" />
                    </div>
                </div>
                <div class="nav__secondary">
                    <ul class="nav__menu">
                        <li class="navbar__item">
                            <a href="#mens" class="navbar__links">Clothing</a>
                        </li>
                        <li class="navbar__item">
                            <a href="#mens" class="navbar__links">Footwear</a>
                        </li>
                        <li class="navbar__item">
                            <a href="#mens" class="navbar__links">Homeware</a>
                        </li>
                        <li class="navbar__item">
                            <a href="#mens" class="navbar__links">Accessories</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    }
}

window.customElements.define('my-nav', Navbar);