// It is similar to : string[]. Below representation is generic type along with Array type.
const arr: Array<string> = [];
arr[0].split(' ');

// We can mix the types also i.e. we can union type.
const arr1: Array<string | number> = [];

// Another generic type is the promise type. We use Promise type along with generic type.
const promise: Promise<number> = new Promise((resolve, reject) => 
{
	setTimeout(() => {
		resolve(10);
	}, 2000);
});

promise.then(data => {
  	// data.split(' ');
})

// TS ables to infer that we accept Object types and returns (Object & Object) type. But Object type is highly unspecific that is we can't
// know anything about that but only Object. (Object & Object) is the intersection of two Objects which results in some other unknown object.
function build(objA: Object, objB: Object) {
	// console.log(objA); console.log(objB);
	return Object.assign(objA, objB);
}

// We type casted the return object so that we can access name or age property with surety that they exists.
const bb = build({a:"gg"}, {age: 12, b:"ffer"}) as {name: string, age: number};
// console.log(bb.name);

// Here we work with more specific types i.e. generic type. T and U are very specific and TS will understand whatever they contain.
// We have to more specifc about T and U so we extends from object which says T and U can be any object with any structure but thet have
// to be object.
function merge<T extends object, U extends object>(objA: T, objB: U) {
  	console.log(Object.assign(objA, objB));
	console.log(objA); console.log(objB);
}

// Whatever we pass as the 1st argument will become the type of T and 2nd for U.
const mergedObj = merge({ name: 'Max', hobbies: ['Sports'] }, { age: 30 });
console.log(mergedObj);

// But we can be more specific and strict by using angular brackts after function name.
const obj = merge<{name: string, age: number}, {height: number}>({name: "Gunjan", age: 21}, {height: 12});
console.log(obj);


interface Lengthy {
  	length: number;
}

// T extends Lengthy : we are assuring that whatever the type of T, it will have length as a property. Like array or string have
// length as a property but number doesn't. We are returning tuple : [T, string] where first element is of type T and second will
// be of type string.
function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
	let descriptionText = 'Got no value.';

	if (element.length === 1) {
		descriptionText = 'Got 1 element.';
	} else if (element.length > 1) {
		descriptionText = 'Got ' + element.length + ' elements.';
	}

	return [element, descriptionText];
}

console.log(countAndDescribe(['Sports', 'Cooking']));

// 'keyof' is a keyword which is used to represent the key of an object. T has to be an object and U has to be one among the keys of 
// the object T.
function extractAndConvert<T extends object, U extends keyof T>(obj: T,key: U) {
  	return 'Value: ' + obj[key];
}

extractAndConvert({ name: 'Max' }, 'name');

class DataStorage<T extends string | number | boolean> 
{
	private data: T[] = [];

	addItem(item: T) {
		this.data.push(item);
	}

	removeItem(item: T) {
		if (this.data.indexOf(item) === -1) {
			return;
		}

		this.data.splice(this.data.indexOf(item), 1); // -1
	}

	getItems() {
		return [...this.data];
	}
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('Manu');
textStorage.removeItem('Max');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();

// const objStorage = new DataStorage<object>();
// const maxObj = {name: 'Max'};
// objStorage.addItem(maxObj);
// objStorage.addItem({name: 'Manu'});
// // ...
// objStorage.removeItem(maxObj);
// console.log(objStorage.getItems());

interface CourseGoal {
	title: string;
	description: string;
	completeUntil: Date;
}

function createCourseGoal(
	title: string,
	description: string,
	date: Date
): CourseGoal {

	// 'Partial' tells TS that it is an object which in the end will be a CourseGoal but initially 'Partial' kinda wrap of own type
	// and changes it to a type where all properties of CourseGoal are optional. Therefore we can set this object to empty initially
	// and still add the properties stpe by step.
	let courseGoal: Partial<CourseGoal> = {};
	courseGoal.title = title;
	courseGoal.description = description;
	courseGoal.completeUntil = date;

	// Type casted Partial<CourseGoal> to CourseGoal as return type is CourseGoal.
	return courseGoal as CourseGoal;
}

// Readonly says this array is an array of string but read only. We can't do any changes to this array like adding or removing items.
const names: Readonly<string[]> = ['Max', 'Anna'];
// names.push('Manu');
// names.pop();