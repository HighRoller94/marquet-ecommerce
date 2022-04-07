class Footer extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="footer">
            <div class="footer__container">
            <span class="footer__divider"></span>
            <svg class="footer__logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 340"><rect width="350" height="340" fill="#000000"/><path d="M225.59,240.57h39.46l49.72,138.11q4.74,13.43,9.28,27t9.27,27h1.58q4.73-13.41,8.88-27t8.88-27l48.93-138.11h39.85V499.43H410.66V357q0-17.36,1.58-38.28T415,280.43h-1.58L392.9,339.22,344,473.38h-21.7L273.34,339.22l-20.52-58.79h-1.58q1.19,17.35,2.57,38.27T255.19,357V499.43h-29.6Z" transform="translate(-155 -200)" fill="#fff"/>
                                </svg>
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
                <div class="copyright">
                    <p>Copyright Marquet &copy<p>
                </div>
            </div>
            
        </div>
        `;
    }
}

window.customElements.define('marquet-footer', Footer);