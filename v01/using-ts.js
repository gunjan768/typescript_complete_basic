var button = document.querySelector("button");
// Exclamation mark (!) ensures that element should never be null. As a developer we of course know that this will always find an element 
// (document.getElementById("num1") will give element) because we double check that. In addition we always that it will always be an input
// element so we can use 'as HTMLInputElement' (typecasting).
var input1 = document.getElementById("num1");
var input2 = document.getElementById("num2");
var add = function (num1, num2) {
    if (typeof num1 === 'number' && typeof num2 === 'number')
        return num1 + num2;
    else {
        return +num1 + +num2;
    }
};
button.addEventListener("click", function () {
    // Whenever you access input like this 'input1.value' then it is always string no matter whether input type is number or anything.
    console.log(add(+input1.value, +input2.value));
});
