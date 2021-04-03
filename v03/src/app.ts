let appId = 'abc';
const button = document.querySelector('button')!;

// 'noImplicitReturns' is set to true means if there is any return statement inside a function then that function has to return something.
// Means all branches of that function should have return statement.
function add(n1: number, n2: number) {
	// Consider below 'if case' as one branch of the function. It has return statement, then there should be return statement outside the 
	// if condition also.
	if (n1 + n2 > 0) {
		return n1 + n2;
	}
	
	// If we don't write this if condition then it is going to throw an error if 'noImplicitReturns' is set to true.
	return;
}

function clickHandler(message: string) {
	// let userName = 'Max';
	console.log('Clicked! ' + message);
}

if (button) {
  	button.addEventListener('click', clickHandler.bind(null, "You're welcome!"));
}
