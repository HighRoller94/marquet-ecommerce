class Newsletter extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="container">
            <div class="divider__bottom">
                    <span></span>
                </div>
            <div class="newsletter">
                <div class="newsletter__container">
                    <div class="newsletter__header">
                        <h2>Sign up to our newsletter</h2>
                        <p>We'll let you know when our next sale hits</p>
                    </div>
                    <form class="newsletter__form">
                        <input type="text" name="email" />
                        <button class="newsletter__button">Sign up</button>
                    </form>
                </div>
            </div>
        </div>
        `;
    }
}

window.customElements.define('marquet-newsletter', Newsletter);