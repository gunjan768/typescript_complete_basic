const button = document.querySelector("button");

// Exclamation mark (!) ensures that element should never be null. As a developer we of course know that this will always find an element 
// (document.getElementById("num1") will give element) because we double check that. In addition we always that it will always be an input
// element so we can use 'as HTMLInputElement' (typecasting).
const input1 = document.getElementById("num1")! as HTMLInputElement;

const input2 = document.getElementById("num2")! as HTMLInputElement;

const add = (num1 : number, num2 : number) =>
{
	if(typeof num1 === 'number' && typeof num2 === 'number')
	return num1 + num2;
	else
	{
		return +num1 + +num2;
	}
}

button.addEventListener("click", () =>
{
	// Whenever you access input like this 'input1.value' then it is always string no matter whether input type is number or anything.
  	console.log(add(+input1.value, +input2.value));
});