'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};
// new Object

// const jonas = new Person('Jonas', 1991);
// console.log(jonas instanceof Person);

// // 1. A new empty object is created
// // 2. Function is called, this = {}
// // 3. New object is linked to Prototype
// // 4. function returns object

// // Prototype
// console.log(Person.prototype);

// Person.prototype.calcAge = function () {
//   console.log(2021 - this.birthYear);
// };

// console.log(Person.__proto__);

// jonas.calcAge();
// const arr = [1, 2, 3, 4];

// const h1 = document.querySelector('h1');
// console.dir(h1);

// ES6 Classes

// Class Expression
// const PersonCl = class {};

// Class Declaration
class PersonCl {
  constructor(firstName, birthYear) {
    // object init is here
    this.firstName = firstName;
    this.birthYear = birthYear;
  }
  // object methods go here
  calcAge() {
    console.log(2037 - this.birthYear);
  }
}

PersonCl.prototype.greeting = function () {
  console.log(`Hey ${this.firstName}, how are you doing?`);
};

const jessica = new PersonCl('jessica', 1993);
jessica.calcAge();

// 1. Classes are NOT Hoisted
// 2. Classes are first-class citizens
// 3. Class bodies are ALWAYS executed in strict mode
