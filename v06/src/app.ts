// **************************************************** Intersection type ***************************************************************

type Admin = {
	name: string;
	privileges: string[];
};

type Employee = {
	name: string;
	startDate: Date;
};

// We can use interface instead of 'type' and can make a 3rd interface which extends first two.
// interface ElevatedEmployee extends Employee, Admin {}

// & is combining the both. It is an intersection type. In case of object intersection type means contains all the properties of both
// the object types.
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
	name: 'Max',
	privileges: ['create-server'],
	startDate: new Date()
};

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

// **************************************************** Intersection type ***************************************************************


// ******************************************************* Function Overloading *********************************************************

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: string, b: number): string;
function add(a: number, b: string): string;

function add(a: Combinable, b: Combinable) {
	if (typeof a === 'string' || typeof b === 'string') {
		return a.toString() + b.toString();
	}
	return a + b;
}

// We can avoid using 'as string' to typecast (which is used to ensure that the value returned from add() function should be a string so 
// that we can used string split() method on it) by using function overloading. We will call that overloaded version of the function only 
// which has return type of string.
const result = add('Max', ' Schwarz') as string;
result.split(' ');

// ******************************************************* Function Overloading *********************************************************


// ******************************************************** Optional Chaining ***********************************************************

const fetchedUserData = {
	id: 'u1',
	name: 'Max',
	job: { title: 'CEO', description: 'My own company' }
};

// If we fetch data from backend then we can't sure that we have job property inside the 'fetchedUserData' object. In normal JS we can
// check like this : fetchedUserData && fetchedUserData.job && fetchedUserData && fetchedUserData.title. In TS we have a nicer way of
// doing it using 'Optional Chaining' by putting a question mark at the end of each doubt part like : fetchedUserData?.job?.title
console.log(fetchedUserData?.job?.title);

// ******************************************************** Optional Chaining ***********************************************************


// ******************************************************** Nullish Coalescing ***********************************************************

// If we fetch data from backend then data can be null or undefined or at least some of it. In this case in normal vanilla JS we check
// using OR operator like : userInput || 'Default'. But in this case empty string is also treated as falsy value. You can use different
// approach aka if and else check. In TS we have a 'Nullish Coalescing' operator which checks only for mull or undefined (and not for
// empty string). It is represend by double question mark (??).
const userInput = undefined;

const storedData = userInput ?? 'DEFAULT';

console.log(storedData);

// ******************************************************** Nullish Coalescing ***********************************************************


type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
	
	console.log('Name: ' + emp.name);
	
	// See whether 'privileges' property exist in emp object or not. If we check typeof emp === 'object' but it will always be correct and it
	// doesn't say anything about it's properties.
	if ('privileges' in emp) {
		console.log('Privileges: ' + emp.privileges);
	}
	if ('startDate' in emp) {
		console.log('Start Date: ' + emp.startDate);
	}
}

printEmployeeInformation({ name: 'Manu', startDate: new Date() });

class Car {
	drive() {
		console.log('Driving...');
	}
}

class Truck {
	drive() {
		console.log('Driving a truck...');
	}

	loadCargo(amount: number) {
		console.log('Loading cargo ...' + amount);
	}
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
	vehicle.drive();

	if ('loadCargo' in vehicle) {
		vehicle.loadCargo(100);
	}

	// Try to avoid using above if case as we can misspell 'loadCargo'. So instead we can use 'instanceof' operator which is built in
	// JS and checks at runtime.
	if (vehicle instanceof Truck) {
		vehicle.loadCargo(1000);
	}
}

useVehicle(v1);
useVehicle(v2);

// **************************************************** Discriminated type ***************************************************************

// This is a discriminated union because we have one common property in every object that makes up our union which describes that object
// so that we can use thsi property that describe this object in our check to have 100% type safety and understands which properties are
// available for such an object and whcih properties are not. Here we have used 'kind' as union type. 
interface Bird {
	kind: 'bird';
	flyingSpeed: number;
}

interface Horse {
	kind: 'horse';
	runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
	let speed;
	switch (animal.kind) {
		case 'bird':
		speed = animal.flyingSpeed;
		break;
		case 'horse':
		speed = animal.runningSpeed;
	}
	console.log('Moving at speed: ' + speed);
}

moveAnimal({kind: 'bird', flyingSpeed: 10});

// **************************************************** Discriminated type ************************************************************


// **************************************************** Typecasting *******************************************************************

// Typecasting can be done in two ways : writing something before and writing something after which will type cast the element. Here we 
// want to type cast an HTMLElement to HTMLInputElement as getElementById() will be not sure of which HTML element is it.

// ........................... 1) Writing <HTMLInputElement> before.  
// const userInputElement = <HTMLInputElement>document.getElementById('user-input')!;

// ........................... 2) Using as keyword after (React way of doing)
const userInputElement = document.getElementById('user-input')! as HTMLInputElement;

// 'value' property is not available in all HTML elements so we need the type casting to convert generic HTML element to more specific one.
userInputElement.value = 'Hello Love';

// If we want to avoid writing exclamation mark, we can.
const userInputElement1 = document.getElementById('user-input');

// As we are not sure that 'userInputElement1' is null or not as we have not used exclamation mark, so we explicitly used if check.
if (userInputElement1) {
	
	// Typecasting userInputElement1 to HTMLInputElement.
  	(userInputElement1 as HTMLInputElement).value = 'Hi there!';
}

// **************************************************** Typecasting *******************************************************************


// **************************************************** Index Types *******************************************************************

// Index Type is a feature that allows us to create objects regarding the properties they might hold.
interface ErrorContainer {
	
	// We don't know the exact property name and also don't know the property count. I just know that every property added to this object
	// must have a property name which cab interoreted as a string and the value for that property also must be a string.
  	[prop: string]: string;

	// We can add extra predefined properties as much as we want but they must be of the same type as that of 'prop' so here string.
	id: string;		// This is valid as type is string
	// age: number;	// Give you an error as type is not string
}

const errorBag: ErrorContainer = {
	email: 'Not a valid email!',
	username: 'Must start with a capital character!',
	id: 'G2'
};

// **************************************************** Index Types *******************************************************************