// Navbar logika
let isNavbarOpen = false;
const navbarToggler = document.querySelector('#navbar-toggler');
const navbarMenu = document.querySelector('#navbar-menu');
const navbarMenuLinks = navbarMenu.querySelectorAll('.menu__link-container__link');

navbarToggler.addEventListener('click', () => {
  if (isNavbarOpen) closeNavbar();
  else openNavbar();

  function openNavbar() {
    disableScroll();
    navbarMenuLinks.forEach(link => link.addEventListener('click', () => {
      closeNavbar();
    }, { once: true }));
    navbarToggler.classList.add('active');
    navbarMenu.classList.add('active');
    isNavbarOpen = true;
  }

  function closeNavbar() {
    navbarToggler.classList.remove('active');
    navbarMenu.classList.remove('active');
    enableScroll();
    isNavbarOpen = false;
  }
})

// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
let keys = { 32: 1, 33: 1, 34: 1, 35: 1, 36: 1, 38: 1, 40: 1 };

function preventDefault(e) {
  e.preventDefault();
}

function preventDefaultForScrollKeys(e) {
  if (keys[e.keyCode]) {
    preventDefault(e);
    return false;
  }
}

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener("test", null, Object.defineProperty({}, 'passive', {
    get: function () { supportsPassive = true; }
  }));
} catch (e) { }

let wheelOpt = supportsPassive ? { passive: false } : false;
let wheelEvent = 'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

// call this to Disable
function disableScroll() {
  window.addEventListener('DOMMouseScroll', preventDefault, false); // older FF
  window.addEventListener(wheelEvent, preventDefault, wheelOpt); // modern desktop
  window.addEventListener('touchmove', preventDefault, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('DOMMouseScroll', preventDefault, false);
  window.removeEventListener(wheelEvent, preventDefault, wheelOpt);
  window.removeEventListener('touchmove', preventDefault, wheelOpt);
  window.removeEventListener('keydown', preventDefaultForScrollKeys, false);
}