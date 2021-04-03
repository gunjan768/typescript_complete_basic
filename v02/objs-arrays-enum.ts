// ****************************************************** Objects *********************************************************************

// Objects types are written almost like objects (object type inferred by TypeScript) but of course we don't have key value pairs but key
// type pairs. Objects types are there to describe well the type of object that is getting used somewhere. Key type pairs have semicolon
// at the end. For example : 

// JS plain object
// const person = {
//     name: "Gunjan",
//     age: 21
// };

// This is the Object type for above object (hover over person object to see it's Object Type).
// const person : {
//     name : string;
//     age : number;
// }

// We could be more generic, we could explicitly assign a type here to the constant of Object. Object is one of the built in types just
// like number and string. We should be more specific by setting a specific object type, the thing TS could also inferred automatically.
// We will do this by using curly braces just after colon.
// const person: Object = {
//     name: "Gunjan",
//     age: 21
// };

// By just writing curly braces (empty) is equivalent to writting 'Object' (in just above example). Inside curly braces we have to write
// Object Type (not required due to TS inbuilt Type Inference property but for learning purpose we have written here).We can't change the 
// type of object's properties like here name is string then it has to be string throughout as TS will explicity infer it as string.

// Object with Object Type (i.e. type assigment means assigning the type to the variables)
// const person: {
//     name: string;
//     age: number;
// } = {
//     name: "Gunjan",
//     age: 21
// };

// ****************************************************** Objects *********************************************************************


// ****************************************************** Arrays **********************************************************************

const person = {
    name: "Gunjan",
    age: 21,
    hobbies: ["sports", "Cooking"]
};

// string[] : Tells TS it's an array of strings only.
let fav: string[];
fav = ["Gunjan", "Emilia"];

// any[] : tells TS do whatever you want
let mp: any[];
mp = ["Gunjan", "Emilia"];

for (const hobby of person.hobbies) {

    // On 'hobby' we can access on any string for example toUpperCase() function. And TS doesn't complain, why ? Because it knows that
    // hobbies is of type string array. So when we access 'person.hobbies', TS inference detects that hobbies wil be an array of string
    // so 'hobby' is correctly identified as being a string.
    console.log(hobby);
}

// ****************************************************** Arrays **********************************************************************

// ****************************************************** Tuples **********************************************************************

// We have to explicity mention the type assignment as TS Type Inference doesn't work as we want it to work (due to role array)
const person1: {
    name: string;
    age: number;
    hobbies: string[];

    // This is basically a tuple (with fixed array size and fixed array elements's type). Tuple will tell TS that we want a special array
    // with exactly 2 elements where 1st element should be number and second string
    role: [number, string];

} = {
    name: "Gunjan",
    age: 21,
    hobbies: ["sports", "Cooking"],
    role: [2, 'author']
};

// role is an array where we want only two elements where 1st element is number and second string.

// This will wrok as TS doesn't know that role array has to have exaclty 2 elements only. Tough we have explicitly mention the type
// assigment, we will not get an error because 'push()' function is an exception and we can increase the size of an array like this.
person1.role.push('admin');

// But assigning and increasing the lenght the of the array like this will give an error.
// person1.role = [10, "gunjan", "hello"];

// This will also work as TS only knows that role is an array of combination of number or string but not exaclty that first element must
// be number and second element must be string. It will give an error when we explicitly mention the type assigment like we did above and
// now it will give an error.
// person1.role[1] = 10;

for (const hobby of person1.hobbies) {

    // On 'hobby' we can access on any string for example toUpperCase() function. And TS doesn't complain, why ? Because it knows that
    // hobbies is of type string array. So when we access 'person.hobbies', TS inference detects that hobbies wil be an array of string
    // so 'hobby' is correctly identified as being a string.
    console.log(hobby);
}

// ****************************************************** Tuples **********************************************************************

// ****************************************************** Enum **********************************************************************

enum Role {ADMIN = 'MASTER', READ_ONLY = 100, AUTHOR = 2.2};

// TS will convert the above Role in Javascript and the code for the same will look like the below one

// var Role;
// (function (Role) {
//     Role["ADMIN"] = "MASTER";
//     Role[Role["READ_ONLY"] = 100] = "READ_ONLY";
//     Role[Role["AUTHOR"] = 2.2] = "AUTHOR";
// })(Role || (Role = {}));

const person2 = {
    name: "Gunjan",
    age: 21,
    hobbies: ["sports", "Cooking"],
    role: Role.ADMIN
};

for (const hobby of person1.hobbies) {
    console.log(hobby);
}

if(person2.role === Role.AUTHOR) {
    console.log('is author');
}

// ****************************************************** Enum **********************************************************************