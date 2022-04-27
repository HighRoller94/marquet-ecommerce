// NAVBAR WEB COMPONENT

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
                    <div class="nav__toggle" id="mobile-menu">
                        <span class="bar"></span>
                        <span class="bar"></span>
                        <span class="bar"></span>
                    </div>
                    <a href="/html/index.html" id="nav__logo">MARQUET</a>
                    <div class="side__menu">
                        <ul class="nav__menu">
                            <div class="mobile__logoContainer">
                                <svg class="mobile__logo" id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 350 340"><rect width="350" height="340" fill="#000000"/><path d="M225.59,240.57h39.46l49.72,138.11q4.74,13.43,9.28,27t9.27,27h1.58q4.73-13.41,8.88-27t8.88-27l48.93-138.11h39.85V499.43H410.66V357q0-17.36,1.58-38.28T415,280.43h-1.58L392.9,339.22,344,473.38h-21.7L273.34,339.22l-20.52-58.79h-1.58q1.19,17.35,2.57,38.27T255.19,357V499.43h-29.6Z" transform="translate(-155 -200)" fill="#fff"/>
                                </svg>
                            </div>
                            <li class="navbar__item">
                                <a href="#" class="navbar__links">Mens</a>
                            </li>
                            <li class="navbar__item">
                                <a href="#" class="navbar__links">Womens</a>
                            </li>
                            <li class="navbar__item">
                                <a href="#" class="navbar__links">Footwear</a>
                            </li>
                            <li class="navbar__item">
                                <a href="#" class="navbar__links">Accessories</a>
                            </li>
                            <div class="mobile__bottom">
                                <a href="/html/orders.html">
                                    <p>My orders</p>
                                </a>
                                <p>Contact us</p>
                            </div>
                        </ul>
                    </div>
                    <div class="nav__icons">
                        <div class="search__icon">
                        
                        </div>
                        <a href="/html/basket.html">
                            <p class="basket__count"></p>
                            <img class="shopping__icon" src="" alt="Basket" />
                        </a>
                        <a href="/html/orders.html">
                            <img class="account__icon" src="../assets/navbar/account.svg" alt="" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="nav__slider">
                <p>Join the family and get 20% off your next purchase</p>
                <p>Free delivery when you spend over £50</p>
                <p>Not happy with your order? Send it back and get in touch</p>
            </div>
        </nav>
    `;
    }
}

window.customElements.define('marquet-nav', Navbar);

// CHANGE NAV ON SCROLL 

const nav = document.querySelector('.navbar');

const scrollNav = () => {
    const toast = document.querySelector('.toast')
    if (window.scrollY >= 10) {
        nav.classList.add('active')
    } else {
        nav.classList.remove('active')
    }
}

window.addEventListener("scroll", scrollNav);

// NAV TEXT SLIDER

var timer;
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}

function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    const slides = document.querySelector('.nav__slider').children;
    if (n > slides.length) {
        slideIndex = 1
    }
    if (n < 1) {
        slideIndex = slides.length
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].classList.remove('fade-in')
    }
    slides[slideIndex - 1].classList.add('fade-in')
    clearTimeout(timer);
    timer = setTimeout(() => plusSlides(1), 8000);
}



// MOBILE MENU

const menu = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".side__menu");

const mobileMenu = () => {
    menu.classList.toggle('active')
    navMenu.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// CURRENT URL LOCATION

const currentLocation = location.href;
const menuItem = document.querySelectorAll('.navbar__item');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.toggle("active")
    }
}

// COUNTDOWN TIMER

const countdown = () => {
    const currentDate = new Date().getTime();
    const countDate = new Date('September 15, 2022 00:00:00').getTime();
    
    const diff = countDate - currentDate;

    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const textDay = Math.floor(diff / day);
    const textHour = Math.floor((diff % day) / hour);
    const textMinute = Math.floor((diff % hour) / minute);
    const textSecond = Math.floor((diff % minute) / second);

    const outputHours = (textHour).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const outputMinutes = (textMinute).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })
    const outputSeconds = (textSecond).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })

    const timer = document.querySelectorAll('.timer');
    timer.forEach(time => {
        time.innerHTML = outputHours + ':' + outputMinutes + ':' + outputSeconds;
    })
}

setInterval(countdown, 100);