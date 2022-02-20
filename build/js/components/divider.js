class Divider extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="divider">
            <span></span>
            <h2>${this.getAttribute('heading')}</h2>
            <span></span>
        </div>
        `;
    }
}

window.customElements.define('page-divider', Divider);