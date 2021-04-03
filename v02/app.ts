// 'unknown' type is almost same as 'any' type. We can give any value to 'unknown' type later. It simply means value of 'unknown' type is 
// unknowm beforehand.
let userInput: unknown;
let userName: string;

userInput = 5;
userInput = 'Gunjan';

// You can't assign userName to userInput as variable userInput has 'unknown' type that is we are not sure of it's type. But this error 
// will go away if you change the type of 'unknown' to 'any'. This is one of the differences b/w 'unknown' and 'type'.
// userName = userInput;	// Will give you an error.

// We can assign userName to userInput but before that we need to explicitly check that variable userName must be 'string'.
if (typeof userInput === 'string') {
  	userName = userInput;
}

// 'never' is newer type in TS which can be used with return type of the function. It means that function will not return anything not even
// undefined. Even if we don't write 'never' as a return type, generateError() will not return anything ? Why ? Because of throw keyword.
// Other case where function will not return anything is infinite loop. So we explicitly mentioned the return type of function as 'never'. 
function generateError(message: string, code: number): never {
	throw { message: message, errorCode: code };
	// while (true) {}
}

generateError('An error occurred!', 500);