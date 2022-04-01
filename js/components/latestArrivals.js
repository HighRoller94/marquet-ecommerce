class LatestArrivals extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
        <div class="more__products">
            <h1>Check out our latest arrivals</h1>
            <div class="more__container">
                <div class="more__product">
                    <img src="../assets/accessories/mens__jeans.jpeg" alt="" />
                    <h4>Blue Jeans</h4>
                    <p>£15.99</p>
                </div>
                <div class="more__product">
                    <img src="../assets/accessories/mens__jeans.jpeg" alt="" alt="" />
                    <h4>Blue Jeans</h4>
                    <p>£15.99</p>
                </div>
                <div class="more__product">
                    <img src="../assets/accessories/mens__jeans.jpeg" alt="" alt="" />
                    <h4>Blue Jeans</h4>
                    <p>£15.99</p>
                </div>
                <div class="more__product">
                    <img src="../assets/accessories/mens__jeans.jpeg" alt="" alt="" />
                    <h4>Blue Jeans</h4>
                    <p>£15.99</p>
                </div>
            </div>
        </div>
    `;
    }
}

window.customElements.define('latest-arrivals', LatestArrivals);