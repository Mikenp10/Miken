const navToggle = document.querySelector('.nav-toggle');
const nav = document.querySelector('.main-nav');
const menu = document.querySelector('#site-menu');

function setMenuVisibility(isMobile) {
  menu.setAttribute('aria-hidden', isMobile ? 'true' : 'false');
  navToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('open');
}

function toggleNav() {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open', !expanded);
  menu.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}

if (navToggle && menu) {
  navToggle.addEventListener('click', toggleNav);

  menu.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => {
      if (window.innerWidth <= 720) {
        toggleNav();
      }
    })
  );

  const handleResize = () => {
    const isMobile = window.innerWidth <= 720;
    setMenuVisibility(isMobile);
  };

  window.addEventListener('resize', handleResize);
  handleResize();
}

const yearEl = document.querySelector('#year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}
