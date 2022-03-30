const LOADING_TIME = 2 * 1000;

/**
 * Constants
 */
const COLLAPSE_NAV_WIDTH = 1280;
const SCROLLED_NAV_Y = 50;

// Navbar section
const navbar = document.getElementById("Navbar");
// Navbar isologo
const navIsologo = document.getElementById("Nav-Isologo");
const NavbarToggleBtn = document.getElementById("Navbar-toggle-btn");
const NavbarToggleSpan = document.getElementById("Navbar-toggle-span");

/**
 * Navbar background on scroll
 */

function HandleScrollNavbar() {

  let posY = window.scrollY;

  if (posY >= SCROLLED_NAV_Y) {
    navbar.classList.add('scrolled');
    navIsologo.classList.remove('nodisplay');
    return;
  }
  navbar.classList.remove('scrolled');
  navIsologo.classList.add('nodisplay');

}

window.addEventListener('scroll', HandleScrollNavbar);

/**
 * Smooth Scrolling
 */

const navLinks = [
  {
    doc: document.getElementById('nav-Hero'),
    goTo: 'Hero'
  },
  {
    doc: document.getElementById('nav-About'),
    goTo: 'About'
  },
  {
    doc: document.getElementById('nav-Speakers'),
    goTo: 'Speakers'
  },
  {
    doc: document.getElementById('nav-Schedule'),
    goTo: 'Schedule'
  },
  {
    doc: document.getElementById('nav-Place'),
    goTo: 'Place'
  },
  {
    doc: document.getElementById('nav-Sponsors'),
    goTo: 'Sponsors'
  },
  {
    doc: document.getElementById('nav-Tickets'),
    goTo: 'Tickets'
  },
  {
    doc: document.getElementById('goDownIcon'),
    goTo: 'About'
  }
];

function smoothScroll(target) {
  
  var time = 500;

  var targetSection = document.getElementById(target);
  var pos = targetSection.offsetTop;
  if (pos !== 0 && !navbar.classList.contains('collapse')) {
    pos -= navbar.clientHeight
  }

  var currentPos = window.pageYOffset;
  var start = null;
  if(time == null) time = 500;
  pos = +pos, time = +time;
  window.requestAnimationFrame(function step(currentTime) {
      start = !start ? currentTime : start;
      var progress = currentTime - start;
      if (currentPos < pos) {
          window.scrollTo(0, ((pos - currentPos) * progress / time) + currentPos);
      } else {
          window.scrollTo(0, currentPos - ((currentPos - pos) * progress / time));
      }
      if (progress < time) {
          window.requestAnimationFrame(step);
      } else {
          window.scrollTo(0, pos);
      }
  });
  
}

navLinks.map((navLink) => {
  navLink.doc.addEventListener('click', (event) => {
    event.preventDefault();
    smoothScroll(navLink.goTo);
  })
});


/**
 * Collapse navbar
 */

function collapseNavBar() {
  const window_width = window.innerWidth
  if (window_width < COLLAPSE_NAV_WIDTH) {
    navbar.classList.add('collapse')
    navbar.classList.remove('shown');
    NavbarToggleBtn.classList.add('shown');
    return;
  }
  navbar.classList.remove('collapse');
  NavbarToggleBtn.classList.remove('shown');
}

window.addEventListener('resize', () => collapseNavBar());

function toggleNavbar() {

  if (!navbar.classList.contains('collapse')) return;
  if (navbar.classList.contains('shown')) {
    navbar.classList.remove('shown');
    NavbarToggleBtn.classList.add('shown');
    return;
  }
  navbar.classList.add('shown');
  NavbarToggleBtn.classList.remove('shown');
}

NavbarToggleBtn.addEventListener('click', (event) => {
  event.preventDefault();
  toggleNavbar();
})


window.addEventListener('click', (event) => {
  if (
    event.target == NavbarToggleBtn ||
    event.target == NavbarToggleSpan ||
    !navbar.classList.contains('collapse') ||
    !navbar.classList.contains('shown')
  ) return;

  event.preventDefault();
  toggleNavbar();
})
/**
 * On load
 */
collapseNavBar()
HandleScrollNavbar()

const texts = ["Cordobés...", "Tecnológico...", "Salmorejo..."]
const textDisplay = document.getElementById('typingText')

/**
 * Control TypingEffect Vars
 */
let textsIterator = 0;
let wordIterator = 0;
let isErasing = false;
let currentPhrase = [];

const TypingEffect = () => {
  /**
   * Random timing
   */
  const speed = 250; 
  const MinimumTimeMs = speed * 0.50;
  const MaximumTimeMs = speed * 1.50;
  const diff = MaximumTimeMs - MinimumTimeMs
  const timing = MinimumTimeMs + Math.floor(Math.random() * diff)

  /** Behaviour */
  textDisplay.textContent = currentPhrase.join('')
  if (textsIterator < texts.length) {
    if (!isErasing) {
      currentPhrase.push(texts[textsIterator][wordIterator])
      if (wordIterator === texts[textsIterator].length) {
        isErasing = true
      }
      else wordIterator++;
    }
    if (isErasing) {
      currentPhrase.pop()
      if (wordIterator === 0) {
        isErasing = false;
        textsIterator++;
      }
      else wordIterator--;
    }
  }
  else textsIterator = 0;
  
  setTimeout(TypingEffect, timing);
}

TypingEffect();

/**
 * Loading Screen
 */

const loadingScreen = document.getElementById('Loading')
const tomato = document.getElementById('tomato')

setTimeout(() => {
  tomato.style.transform = 'scale(0)';
}, LOADING_TIME * 3 / 4)
setTimeout(() => {
  loadingScreen.style.transform = 'translateX(-100vw)';
  document.body.style.overflowY = 'unset';
}, LOADING_TIME);