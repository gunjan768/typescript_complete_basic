// Javascript is a dynamic typing language. When you declare a variable, you do not need to specify what type this variable is. Javascript 
// engine infers what type this variable is based on the value assigned to at run time. Typescript on other hand is optionally statically 
// typed which means we define the types of variables and parameters ends on during runtime. They don't suddenly change during runtime.

function add(n1: number, n2: number, showResult: boolean, phrase: string) 
{
    // if (typeof n1 !== 'number' || typeof n2 !== 'number') {
    //   throw new Error('Incorrect input!');
    // }

    const result = n1 + n2;

    if (showResult) {
        console.log(phrase + result);
    } else {
        return result;
    }
}

// We have explicit type assigment in the function arguments and can only be understood by TS, why don't we have down them here ? Because
// TS has a built in feature which is callled Type Inference. This means that TS does it best and it does a pretty good job there to
// understand which type you have in a certain variable or constant. Here for examle it understands that variable number1 will always be
// of type numner in the end because you initialize it with the number.
let temp = "Gunjan";

// Shows an error because TS has infer (due to it's Type Inference property) variable temp as string. 
// temp = 5;

// let number1 = 5 is equivalent to what is written. Avoid explicitly writting types when not required like we did here for variable
// number1. To show as a example I have written it.
let number1: number;
number1 = 5;

const number2 = 2.8;
const printResult = true;
let resultPhrase = 'Result is: ';

add(number1, number2, printResult, resultPhrase);
  