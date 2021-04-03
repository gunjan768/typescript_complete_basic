// (input : number | string) --->  You are combining and saying that input variable will either be a number or string. Combining two or more
// types is called Union type. We are creating an aliases (Combinable) to store the union type.
type Combinable = number | string;

// Literal types are types where you don't just say that a certain variable or parameter should hold let say a number or string but you are
// very clear about the exact value it should hold. For example below we have exact value ('as-number' | 'as-text').
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
    input1: Combinable,
    input2: Combinable,
    resultConversion: ConversionDescriptor
) {
	let result;
	if (typeof input1 === 'number' && typeof input2 === 'number' || resultConversion === 'as-number') {
		result = +input1 + +input2;
	} else {
		result = input1.toString() + input2.toString();
	}
	return result;
	// if (resultConversion === 'as-number') {
	//   return +result;
	// } else {
	//   return result.toString();
	// }
}

const combinedAges = combine(30, 26, 'as-number');
console.log(combinedAges);

const combinedStringAges = combine('30', '26', 'as-number');
console.log(combinedStringAges);

const combinedNames = combine('Max', 'Anna', 'as-text');
console.log(combinedNames);