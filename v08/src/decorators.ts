// Before using Decorator set "experimentalDecorators": true in the tsconfig.json file.
// Decorator at the end is just a function which you apply to somethig for example to a class in a certian way. We know that constructor
// has been received as an argument as we applied to a class and constructor is a function only.
function Logger(cnstctr: Function) {
	console.log("Logging");
	console.log(cnstctr);
}

// Decorator is applied using @ symbol and we are applying it to a class. For applying to a class we need to pass one parameter to
// a function Logger (Decorator). That argument is a constuctor (function).
@Logger
class Person {
	name = "Gunjan"

	constructor() {
		console.log("Creating person object");
	}
}

const per = new Person();

// You will first see the log of the Logger before class because decorator is executed when your class is defined and not when it is 
// excecuted. You don't need to instantiate your class at all, we could remove the code of for instantiating the class and we still
// get that decorator output so the decorator runs when JS finds your class definition (class function definition) not when you use
// that constructor function to instantiate an object.
// console.log(per);


// ******************************************************** Decorator Factory ******************************************************

// We can use decorator factory to create a decorator which basically returns a decorator function but allows to configure it when
// we assign it as a decorator to something. The outer function is called Decorator factory and inner class is called decorator.
function Logger1(message: string) {
	return function(cnstctr: Function) {
		console.log(message);
		console.log(cnstctr);
	}
}

// We are not executing the decorator instead we are executing the outer function which will return an inner function which is decorator.
@Logger1("Created by Gunjan")
class Person1 {
	name = "Gunjan"

	constructor() {
		console.log("Creating person1 object");
	}
}

const per1 = new Person1();
// console.log(per1);

// ******************************************************** Decorator Factory ******************************************************


// ******************************************************** Multiple Decorators ******************************************************

function WithTemplate(template: string, hookId: string) {
	// Using underscore for name siginifies that we know that we got this argument but we don't need it. We have changed the type
	// assignment of the construcotr from 'Function' to 'any' because TS doesn't allowing it to as a constructor to create an object
	// as TS thinks it as a normal function.
	return function(constructor: any) {
		console.log("Inside the WithTemplate Logger")
		const hookEL = document.getElementById(hookId);
		const p = new constructor();

		if(hookEL) {
			hookEL.innerHTML = template;
			hookEL.querySelector('h1')!.textContent = p.name;
		}
	}
}

// We can mulitple decorators to the class. Execution order : Top down for decorator factories (simple JS is applied as the function
// which has been encountered first is executed first i.e. first Logger1 --> then WithTemplate), Bottom Up for decorators i.e. first
// WithTemplate --> then Logger1.
@Logger1("Multiple Decorators")
@WithTemplate('<h1>My Person2 Object</h1>', 'app')
class Person2 {
	name = "Gunjan"

	constructor() {
		console.log("Creating person object");
	}
}

const per2 = new Person2();
console.log(per2);

// ******************************************************** Multiple Decorators ******************************************************