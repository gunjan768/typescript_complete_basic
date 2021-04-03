// We can replace below interface with our custom type. We can use interface and custom type interchangeably. Major diff b/w the two is that
// interface can only be used to describe the structure of and object. But in custon type you can store other things also like union type 
// and so on as we did earlier.
type Person1 = {
    readonly name: string;
    age: number;

    greet(phrase: string): void;
}

// Remember that there is no translation for interfaces. There will be no code generated against these interfaces as JS doenn't know about
// this feature. It's a pure TS feature only available during the development and compilation so you can use it to improve your code, no
// output will end up in your JS files.  
interface Named {
    // You can't add any access specifier except readonly (must be set only once and cannot be changed afterwards).
    readonly name?: string;

    // You can mark any member as optional i.e. derived class is not enforced to override each data member and member method
    // by adding question mark after member name.
    outputName?: string;
}

// Interface is used to describe the structure of the object, how an object looks like. We use interface keyword to create interface.
// We can extends more than one interface (multiple inheritance in interfaace is possible).
interface Greetable extends Named
{
    greet(phrase: string): void;
}

class Person implements Greetable
{
    // As class Person has implemented an interface Greetable so property 'name' is also 'readonly' here.
    name?: string;
    age = 30;

    constructor(n?: string)
    {
        if(n)
        this.name = n;
    }

    greet(phrase: string) 
    {
        if(this.name)
        console.log(phrase + ' ' + this.name);
        else
        console.log('Hi there');
    }
}

let user1: Greetable;

user1 = new Person('Gunjan');

user1.greet('Hi there');

// ************************************************************************************************************************

type Addfn = (a: number, b: number) => number;

// We can replace 'type' with interface. Interface is also used to create a type for function. TS understood the syntax written
// below (anonymous function) to define the type of the function.
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;

// ************************************************************************************************************************