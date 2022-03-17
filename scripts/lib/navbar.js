/**
 * Constants
 */
const COLLAPSE_NAV_WIDTH = 900;
const SCROLLED_NAV_Y = 50;

// Navbar section
const navbar = document.getElementById("Navbar");
// Navbar isologo
const navIsologo = document.getElementById("Nav-Isologo");


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
    doc: document.getElementById('nav-PreviousEvents'),
    goTo: 'PreviousEvents'
  },
  {
    doc: document.getElementById('nav-Tickets'),
    goTo: 'Tickets'
  },
  {
    doc: document.getElementById('goDownIcon'),
    goTo: 'Data'
  }
];

function smoothScroll(target) {
  
  var time = 500;

  var targetSection = document.getElementById(target);
  var pos = targetSection.offsetTop;
  if (pos !== 0) {
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
 * On load
 */

HandleScrollNavbar()