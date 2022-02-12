class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
        <div class="footer__container">
            <h1 class="footer__logo">Marquet</h1>
            <div class="footer__icons">
                <img class="icon" src="../assets/footer/footerstore1.svg" alt="" />
                <img class="icon" src="../assets/footer/footerstore2.svg" alt="" />
            </div>
            <span class="footer__divider"></span>
            <ul class="footer__options">
                <li class="footer__option">About us</li>
                <li class="footer__option">Customer Service</li>
                <li class="footer__option">Student Discount</li>
                <li class="footer__option">Careers</li>
                <li class="footer__option">Media</li>
            </ul>
            <ul class="footer__secondaryOptions">
                <li class="footer__secondOption">Stores</li>
                <li class="footer__secondOption">My account</li>
                <li class="footer__secondOption">Privacy Policy</li>
                <li class="footer__secondOption">Cookie Settings</li>
                <li class="footer__secondOption">Affiliate</li>
                <div class="language">
                    <img src="../assets/footer/uk__flag.svg" alt="" class="language__icon">
                    <li>United Kingdom</li>
                </div>
            </ul>
            <div class="footer__socials">
                <h4 class="facebook">Facebook</h4>
                <span class="socials__divider"></span>
                <h4 class="facebook">Instagram</h4>
                <span class="socials__divider"></span>
                <h4 class="facebook">Twitter</h4>
            </div>
        </div>
    </div>
    `;
    }
}

window.customElements.define('my-footer', Footer);