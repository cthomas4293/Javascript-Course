'use strict';
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never create a method inside a constructor function
  //   this.calcAge = function () {
  //     console.log(2021 - this.birthYear);
  //   };
};

Person.hey = function () {
  console.log('Hey There');
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
  constructor(fullName, birthYear) {
    // object init is here
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // object methods go here
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greeting = function () {
    console.log(`Hey ${this.fullName}, how are you doing?`);
  };

  get age() {
    return 2037 - this.birthYear;
  }

  // Set property that already exists
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name`);
  }

  get fullName() {
    return this._fullName;
  }

  // static method
  static hey = function () {
    console.log('Hey There');
  };
}

const jessica = new PersonCl('jessica Davis', 1993);
// jessica.calcAge();
console.log(jessica.age);

// console.log(jessica.age);

// 1. Classes are NOT Hoisted
// 2. Classes are first-class citizens
// 3. Class bodies are ALWAYS executed in strict mode

const account = {
  owner: 'jonas',
  movements: [200, 530, 120, 300],
  // getter
  get latest() {
    return this.movements.slice(-1).pop();
  },
  // setter
  set latest(mov) {
    this.movements.push(mov);
  },
};

account.latest = 50;
*/
// Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },
// };

// const steven = Object.create(PersonProto);

// steven.name = 'Steven';
// steven.birthYear = 2002;

// Inheritance between classes: Constructor Functions

// const Person = function (firstName, birthYear) {
//   this.firstName = firstName;
//   this.birthYear = birthYear;
// };

// Person.prototype.calcAge = function () {
//   console.log(2021 - this.birthYear);
// };

// const Student = function (firstName, birthYear, course) {
//   Person.call(this, firstName, birthYear);
//   this.course = course;
// };

// // Linking Student.prototype to Person.prototype
// Student.prototype = Object.create(Person.prototype);

// Student.prototype.introduce = function () {
//   console.log(`my name is ${this.firstName}, and I study ${this.course}`);
// };

// const mike = new Student('mike', 2020, 'Computer Science');

// // makes the constructor of the Student prototype Student instead of Person
// Student.prototype.constructor = Student;

// console.log(mike instanceof Student);
// console.log(mike instanceof Person);
// mike.introduce();
// mike.calcAge();

// Inheritance between classes: ES6 Classes

// class PersonCl {
//   constructor(fullName, birthYear) {
//     // object init is here
//     this.fullName = fullName;
//     this.birthYear = birthYear;
//   }
//   // object methods go here
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   }

//   greeting = function () {
//     console.log(`Hey ${this.fullName}, how are you doing?`);
//   };

//   get age() {
//     return 2037 - this.birthYear;
//   }

//   // Set property that already exists
//   set fullName(name) {
//     console.log(name);
//     if (name.includes(' ')) this._fullName = name;
//     else alert(`${name} is not a full name`);
//   }

//   get fullName() {
//     return this._fullName;
//   }

//   // static method
//   static hey = function () {
//     console.log('Hey There');
//   };
// }

// // extends keyword links prototypes behind the scene
// class StudentCl extends PersonCl {
//   constructor(fullName, birthYear, course) {
//     // this is the constructor function of the Parent class
//     // must happen first to create the this keyword in subclass
//     super(fullName, birthYear);
//     this.course = course;
//   }

//   introduce() {
//     console.log(`my name is ${this.fullName}, and I study ${this.course}`);
//   }
// }

// const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');

// Inheritance between classes: Object.create

// const PersonProto = {
//   calcAge() {
//     console.log(2037 - this.birthYear);
//   },

//   init(firstName, birthYear) {
//     this.firstName = firstName;
//     this.birthYear = birthYear;
//   },
// };

// const steven = Object.create(PersonProto);

// // adds the prototype of Student to Person's prototype chain
// const StudentProto = Object.create(PersonProto);

// StudentProto.init = function (firstName, birthYear, course) {
//   PersonProto.init.call(this, firstName, birthYear);
//   this.course = course;
// };

// StudentProto.introduce = function () {
//   console.log(`Hello ${this.firstName}, you are studying ${this.course}`);
// };

// const jay = Object.create(StudentProto);
// jay.init('jay', 2012, 'Computer Science');

// Public Instance Field - will be on all instances
// Private Fields
// Public Methods
// Private Methods

class Account {
  // Public Fields (Instances) *NOT PROTOTYPE
  local = navigator.language;

  // Private Fields (Instances)
  #movements = [];
  #pin;

  constructor(owner, currency, pin) {
    // we can add anything in this constructor
    this.owner = owner;
    this.currency = currency;
    // this.local = navigator.language;
    // protected property
    this.#pin = pin;
    // this._movements = [];

    console.log(`Thanks ${this.owner} for opening a new account `);
  }

  // Static function only accessible to class
  static helper() {
    console.log('Helper');
  }

  // Public Methods
  // Public Interface (API)
  deposit(val) {
    this.#movements.push(val);
  }

  // withdrawl ABSTRACTS that it is just a deposit() with a '-' added
  withdrawl(val) {
    this.deposit(-val);
  }

  requestLoan(val) {
    if (this._approveLoan(val)) {
      this.deposit(val);
      console.log('Loan Approved!');
    }
  }

  // Private Methods
  // #approveLoan(val) {
  _approveLoan(val) {
    return true;
  }
}

const acc1 = new Account('jonas', 'EUR', 1111);
acc1.deposit(250);
acc1.withdrawl(-140);
