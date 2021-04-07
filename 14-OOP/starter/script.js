'use strict';

const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas instanceof Person);

// 1. A new empty object is created
// 2. Function is called, this = {}
// 3. New object is linked to Prototype
// 4. function returns object

// Prototype
console.log(Person.prototype);

Person.prototype.calcAge = function () {
  console.log(2021 - this.birthYear);
};

jonas.calcAge();
