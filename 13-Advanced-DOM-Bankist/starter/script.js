'use strict';

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');

/////////////////////////////////////////////////////////////////////////////
// Modal window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(function (btn) {
  btn.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

/////////////////////////////////////////////////////////////////////////////
// Smooth Scolling

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());

  // Scrolling
  // window.scrollTo(
  //   s1coords.left + window.pageXOffset,
  //   s1coords.top + window.pageYOffset
  // );

  // Smooth Scrolling (manually/ old-school)
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  // Smooth Scrolling (Modern Method - ONLY WORKS IN MODERN BROWSERS)
  section1.scrollIntoView({ behavior: 'smooth' });
});

// Event Listeners

// const h1 = document.querySelector('h1');
// // mouseenter works like css hover

// const alertH1 = function (e) {
//   alert('AddEventListenter: Great! You are reading the heading!! :D ');

//   // makes it so you can only listen once
//   h1.removeEventListener('mouseenter', alertH1);
// };

// h1.addEventListener('mouseenter', alertH1);

/////////////////////////////////////////////////////////////////////////////
// Page Navigation

// Because you are calling a function for each link it would slow performance
// document.querySelectorAll('.nav__link').forEach(function (curr) {
//   curr.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//     console.log('LINK');
//   });
// });

// 1. Add event listener to common parent element
const parentElement = document.querySelector('.nav__links');
// 2. Determine what element originated the event
parentElement.addEventListener('click', function (e) {
  e.preventDefault();
  // matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

/////////////////////////////////////////////////////////////////////////////

// Tabbed Component

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  // Guard Clause
  if (!clicked) return;
  // Remove Tab
  tabs.forEach(t => t.classList.remove('operations__tab--active'));

  // Active Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  tabsContent.forEach(t => t.classList.remove('operations__content--active'));

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

/////////////////////////////////////////////////////////////////////////////

// Menu Fade Animation
const handleHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

// Passing an 'arguement' into a handler function
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));
/////////////////////////////////////////////////////////////////////////////
// Sticky Navigation
const initalCoords = section1.getBoundingClientRect();
// console.log(initalCoords);

// window.addEventListener('scroll', function () {
//   // console.log(window.scrollY);

//   if (window.scrollY > initalCoords.top) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// });
/////////////////////////////////////////////////////////////////////////////
// Stick Navigation: Intersection Observer API
// const obsCallback = function (entries, observer) {
//   // whenever the target element('section1') crosses the root at threshold do below
// };

// const obsOptions = {
//   // viewport
//   root: null,
//   // intersection threshold
//   threshold: [initalCoords],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector('.header');

const navheight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  // when 0% of the header el is out of view then call the function
  threshold: 0,
  // adds margin to the target element
  rootMargin: `-${navheight}px`,
});
headerObserver.observe(header);

/////////////////////////////////////////////////////////////////////////////
// Revealing Elements on Scroll
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

/////////////////////////////////////////////////////////////////////////////
// Lazy Loading Images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  // Replace src att with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => imgObserver.observe(img));
/////////////////////////////////////////////////////////////////////////////
// // creating a DOM Element
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// message.textContent =
//   'We use cookies for improved functionality and analytics.';
// message.innerHTML =
//   'We use cookies for improved functionality and analytics. <button class= btn btn--close-cookie">Got It!</button';

// const header = document.querySelector('.header');

// header.append(message);

// // delete elements
// message.addEventListener('click', function () {
//   message.remove();
// });

// // Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '120%';

// // console.log(getComputedStyle(message).color);
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height, 10) + 30 + 'px';

// // console.log(getComputedStyle(message).height);

// // Access root element (documentElement)

// document.documentElement.style.setProperty('--color-primary', 'orangered');

// // Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.className);

// Smooth Scrolling

// each element has an onevent property - old way
// h1.onmouseenter = function (e) {
//   alert('AddEventListenter: Great! You are reading the heading!! :D ');
// };

// rgb(255,255,255)
// const randomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1) + min);

// const randomColor = () =>
//   `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`;

// console.log(randomColor(0, 255));

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document
//   .querySelector('.nav__links')
//   .addEventListener('click', function (e) {});

// document.querySelector('.nav').addEventListener('click', function (e) {});

// DOM Traversing

// const h1 = document.querySelector('h1');

// // Goind Downward: child
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// // Going Upward: parent
// // Direct parents
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// // querySelector() finds children, where as closest() finds parents - no matter how far in the DOM tree
// // selects the closest parent element that matches the querey string passed in
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// // going sideways: siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
// console.log(h1.previousSibling);
// console.log(h1.nextSibling);

// console.log(h1.parentElement.children);
