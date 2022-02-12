class Newsletter extends HTMLElement {
    connectedCallBack() {
        this.innerHTML = `
        <div class="newsletter__container">
            <div class="newsletter__header">
                <h2>Sign up to our newsletter</h2>
                <p>We'll let you know when our next sale hits</p>
            </div>
            <form action="submit" class="newsletter__form">
                <input type="text" name="email" />
                <button class="newsletter__button">Sign up</button>
            </form>
        </div>
    `
    }
}