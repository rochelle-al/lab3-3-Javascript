//Question 1
// 1. makeCounter below is a decorator function which creates and returns a function that increments a counter.
// a) Create a second counter counter2 using the makeCounter function and test to see if
// it remains independent to counter1
// b) Modify makeCounter so that it takes an argument startFrom specifying where the
// counter starts from (instead of always starting from 0)
// c) Modify makeCounter to take another argument incrementBy, which specifies how
// much each call to counter() should increase the counter value by.

function makeCounter(startFrom, incrementBy) {
    let currentCount = startFrom || 0;
    let increment = incrementBy || 1;
    return function() {
      currentCount += increment;
      console.log(currentCount);
      return currentCount;
    };
  }
let counter1 = makeCounter();
counter1(); // 1
counter1(); // 2

let counter2 = makeCounter(4, 2); //independent counter
counter2();
counter2();













// Question 2
// 2. The following delayMsg function is intended to be used to delay printing a message until some time has passed.


// a) What order will the four tests below print in? Why?

// function delayMsg(msg)
// {
// console.log(`This message will be printed after a delay: ${msg}`)
// }
// setTimeout(delayMsg, 100, '#1: Delayed by 100ms'); //Displays Fourth. This test has a delay of 100 milliseconds
// setTimeout(delayMsg, 20, '#2: Delayed by 20ms'); //Displays Third as there is a delay of 20 milliseconds
// setTimeout(delayMsg, 0, '#3: Delayed by 0ms'); //Displays Second. 0 doesn't guarantee an immediate execution
// delayMsg('#4: Not delayed at all') //Printed first as it doesn't use setTimeout 




// b) Rewrite delayMsg as an arrow function
const delayMsg = (msg) => {
    console.log(`This message will be printed after a delay: ${msg}`);
  };

setTimeout(() => delayMsg('#1: Delayed by 100ms'), 100);
setTimeout(() => delayMsg('#2: Delayed by 20ms'), 20);
setTimeout(() => delayMsg('#3: Delayed by 0ms'), 0);
delayMsg('#4: Not delayed at all');



// c) Add a fifth test which uses a large delay time (greater than 10 seconds)
const timer = setTimeout(() => delayMsg('#5: Dealayed by 1000ms'), 1000);

// d) Use clearTimeout to prevent the fifth test from printing at all.
clearTimeout(timer);








//Question 3

//a) Create a debounce(func) decorator, which is a wrapper that takes a function func and
//suspends calls to func until there's 1000 milliseconds of inactivity. After this 1 second
//pause, the most recent call to func should be executed and any others ignored.
// b) Extend the debounce decorator function to take a second argument ms, which defines the
// length of the period of inactivity instead of hardcoding to 1000ms
function debounce(func, ms) {
  let timeoutId;

  return function debounced(...args) {
    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
      func.apply(this, args);
    }, ms);
  };
}

// c) Extend debounce to allow the original debounced function printMe to take an argument
// msg which is included in the console.log statement.
function printMe(msg) {
  console.log('printing debounced message:', msg);
}

printMe = debounce(printMe, 1000);

setTimeout(() => printMe('First'), 100);
setTimeout(() => printMe('Second'), 200);
setTimeout(() => printMe('Third'), 300);


//Question 4
// 4. The Fibonacci sequence of numbers is a famous pattern where the next number in the
// sequence is the sum of the previous 2.
// e.g. 1, 1, 2, 3, 5, 8, 13, 21, 34, etc.

// function printFibonacci() {
//   let current = 0;
//   let next = 1;

//   const fibonacciInterval = setInterval(() => {
//     console.log(current);
//     const temp = current + next;
//     current = next;
//     next = temp;
//   }, 1000);
// }

// printFibonacci();


// b) Write a new version printFibonacciTimeouts() that uses nested setTimeout
// calls to do the same thing
// c) Extend one of the above functions to accept a limit argument, which tells it how many
// numbers to print before stopping.
function printFibonacciTimeouts(limit) {
  let current = 0;
  let next = 1;
  let count = 0;

  const fibonacciTimeout = () => {
    console.log(current);
    const temp = current + next;
    current = next;
    next = temp;
    count++;

    if (count === limit) {
      return;
    }

    setTimeout(fibonacciTimeout, 1000);
  };

  setTimeout(fibonacciTimeout, 1000);
}

printFibonacciTimeouts(10); // Prints the first 10 Fibonacci numbers!




//Question 5
// 5. The following car object has several properties and a method which uses them to print a
// description. When calling the function normally this works as expected, but using it from
// within setTimeout fails. Why?

//When you use the setTimeout function with car.description, the this context is lost.

let car = {
  make: "Porsche",
  model: '911',
  year: 1964,
  description() {

    console.log(`This car is a ${this.make} ${this.model} from ${this.year}`);
  }
  };
  car.description(); //works
  setTimeout(car.description, 200); //fails

// a) Fix the setTimeout call by wrapping the call to car.description() inside a
// function

setTimeout(function() {
  car.description();
}, 200);

// b) Change the year for the car by creating a clone of the original and overriding it
let carClone = Object.assign({}, car); 
carClone.year = 2023; 
console.log(`Cloned car year: ${carClone.year}`); 

// c) Does the delayed description() call use the original values or the new values from
// b)? Why?

// The delayed description() call will use the original values from the car object, 
// not the new values from the cloned and overridden object in part (b)



// d) Use bind to fix the description method so that it can be called from within
// setTimeout without a wrapper function
setTimeout(car.description.bind(car), 200);


// e) Change another property of the car by creating a clone and overriding it, and test that
// setTimeout still uses the bound value from d)


carClone.make = "Ferrari"; 





//  QUESTION 6
// 6. Use the Function prototype to add a new delay(ms) function to all functions, which can
// be used to delay the call to that function by ms milliseconds.

// a) Use the example multiply function below to test it with, as above, and assume that all
// delayed functions will take two parameters
Function.prototype.delay = function(ms) {
  const originalFunction = this; 
  return function(...args) {
    setTimeout(() => {
      originalFunction.apply(this, args);
    }, ms);
  };
};
function multiply(a, b) {
  console.log(a * b);
}

multiply.delay(500)(5, 5);


// b) Use apply to improve your solution so that delayed functions can take any number of
// parameters
function multiply(...args) {
  const product = args.reduce((acc, val) => acc * val);
  console.log(product);
}

Function.prototype.delay = function(ms) {
  const originalFunction = this; 
  return function(...args) {
    setTimeout(() => {
      originalFunction.apply(this, args);
    }, ms);
  };
};

multiply.delay(500)(2, 3, 4);





// c) Modify multiply to take 4 parameters and multiply all of them, and test that your
// delay prototype function still works.
function multiply(a, b, c, d) {
  console.log(a * b * c * d);
}

Function.prototype.delay = function(ms) {
  const originalFunction = this; 
  return function(...args) {
    setTimeout(() => {
      originalFunction.apply(this, args);
    }, ms);
  };
};

multiply.delay(500)(2, 3, 4, 5);



// 7. In JavaScript, the toString method is used to convert an object to a string representation.
// By default, when an object is converted to a String, it returns a string that looks something
// like [object Object].


// However, we can define our own toString methods for custom objects to provide a more
// meaningful string representation.
function Person(name, age, gender) {
  this.name = name;
  this.age = age;
  this.gender = gender;
  
  this.toString = function() {
    return `Name: ${this.name}, Age: ${this.age}, Gender: ${this.gender}`;
  };
}


const person1 = new Person('James Brown', 73, 'male');
console.log('person1: ' + person1);


// b) Test your method by creating 2 different people using the below constructor function
// and printing them
const person3 = new Person('John Seth', 30, 'male');
const person2 = new Person('Jenny Smith', 25, 'female');
console.log(person3);
console.log(person2);


// c) Create a new constructor function Student that uses call to inherit from Person and
// add an extra property cohort
function Student(name, age, gender, cohort) {
  Person.call(this, name, age, gender);
  this.cohort = cohort;
}

const student1 = new Student('John Doe', 20, 'male', 'Cohort A');
console.log(student1);




