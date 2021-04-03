const userName1 = 'Max';
// userName = 'Maximilian';
// let age = 30;

// age = 29;

// 'let' keyword

function add1(a: number, b: number) {
	let result;
	result = a + b;
	return result;
}

// if (age > 20) {
//   let isOld = true;
// }

// console.log(isOld);

// console.log(result);


// Default parameters for variable b
const add2 = (a: number = 2, b: number = 1) => a + b;

const printOutput = (output: string | number) => console.log(output);

// If we have one argument we can avoid using parenthesis but since we are using type assigment, we can't avoid using parenthesis directly.
// If we shift the place of type assigment from inside the parenthesis, we can avoid parenthesis. We have writtem same printOutput1()
// function defined above. 
const printOutput1: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');

if (button) {
  	button.addEventListener('click', event => console.log(event));
}

printOutput(add2(5));

const hobbies = ['Sports', 'Cooking'];
const activeHobbies = ['Hiking'];

// Spread operator
activeHobbies.push(...hobbies);

const person = {
	firstName: 'Max',
	age: 30
};

// Spread operator
const copiedPerson = { ...person };

// Rest operator comes into play when we receives arguments to a function. We are specifying that variable 'numbers' is an array of numbers.
const add = (...numbers: number[]) => {
	return numbers.reduce((curResult, curValue) => {
		return curResult + curValue;
	}, 0);
};

// We are using Rest Operator and tuple (array size is fixed and it is say here three i.e. we are sure that we always pass exactly 3 arguments
// to add3() function) as type assigment.
const add3 = (...numbers: [number, number, number]) => {
	return numbers.reduce((curResult, curValue) => {
		return curResult + curValue;
	}, 0);
};

const addedNumbers = add(5, 10, 2, 3.7);
console.log(addedNumbers);

const [hobby1, hobby2, ...remainingHobbies] = hobbies;

console.log(hobbies, hobby1, hobby2);

const { firstName: userName, age } = person;

console.log(userName, age, person);