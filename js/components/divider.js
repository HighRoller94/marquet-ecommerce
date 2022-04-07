class Divider extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="divider">
            <h2>${this.getAttribute('heading')}</h2>
            <p>${this.getAttribute('text')}</p>
            <span></span>
        </div>
        `;
    }
}

window.customElements.define('page-divider', Divider);