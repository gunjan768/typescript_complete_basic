// We can explicitly mention the return type of the function. Though TS will infer correctly as both n1 and n2 are numbers so return type will
// also be number. To in some cases we want the return type.
function add(n1: number, n2: number) : number {
  	return n1 + n2;
}

// Return type is explicitly mentioned as void but JS will return 'undefined'.
function printResult(num: number): void {
  	console.log('Result: ' + num);
}

// You will se output as undefined (inspite of having void as return type) instead of seeing no output. 
console.log(printResult(add(5, 12)));

// We can explicitly mention return type type as 'undefined', then in this case there should be 'return' statement otherwise TS will treat
// it as an error.
function printResult1(num: number): undefined {
	console.log('Result: ' + num);
	return;
}

printResult(add(5, 12));

// Will only store function (any function)
let combineValues1: Function;

// Will also store function but more specific with parameters, their types and return type.
let combineValues: (a: number, b: number) => number;

combineValues = add;
// combineValues = printResult;
// combineValues = 5;

console.log(combineValues(8, 8));

// We have 'undefined' as a type.
// let someValue: undefined;

// For callback (named as cb) function we explicilty mentiod that it should not return anything. Though you can return anything from the 
// function body (i.e. you can have return statement with returning some value). How ? Is it a bug ? Nope. It actually happens on purpose
// by specifying void here on our callback type, we are essentially saying we'll ignore any result you might be returning. By writing
// return type as void means that you don't need the return value i.e. TS doesn't enforce you not to write a return statement in the 
// function body.
function addAndHandle(n1: number, n2: number, cb: (num: number) => void) {
	const result = n1 + n2;
	cb(result);
}

addAndHandle(10, 20, result => {
  	console.log(result);

	return 20;
});