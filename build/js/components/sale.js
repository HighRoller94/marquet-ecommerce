class Sale extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="sale">
            <div class="sale__text">
                <h4>Hurry! Sale ends in</h4>
            </div>
            <div class="sale__timer">
                <span class="timer"></span>
            </div>
        </div>
        `;
    }
}

window.customElements.define('sale-text', Sale);
