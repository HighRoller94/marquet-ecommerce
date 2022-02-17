// MOBILE MENU

const menu = document.querySelector(".nav__toggle");
const navMenu = document.querySelector(".nav__secondary");

const mobileMenu = () => {
    menu.classList.toggle('active')
    navMenu.classList.toggle('active')
}

menu.addEventListener('click', mobileMenu);

// CURRENT URL LOCATION

const currentLocation = location.href;
const menuItem = document.querySelectorAll('li');
const menuLength = menuItem.length;

for (let i = 0; i < menuLength; i++) {
    if (menuItem[i].href === currentLocation) {
        menuItem[i].classList.toggle("active")
    }
}

// COUNTDOWN TIMER

const countdown = () => {
    const currentDate = new Date().getTime();
    const countDate = new Date('March 15, 2022 00:00:00').getTime();
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

setInterval(countdown, 1000);

