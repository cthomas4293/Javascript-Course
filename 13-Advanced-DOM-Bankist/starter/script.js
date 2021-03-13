'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

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

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

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

const h1 = document.querySelector('h1');
// mouseenter works like css hover

const alertH1 = function (e) {
  alert('AddEventListenter: Great! You are reading the heading!! :D ');

  // makes it so you can only listen once
  h1.removeEventListener('mouseenter', alertH1);
};

h1.addEventListener('mouseenter', alertH1);

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
