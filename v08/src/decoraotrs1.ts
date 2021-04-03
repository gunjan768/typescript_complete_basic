// // Property decorator
// function Log(target: any, propertyName: string | Symbol) {
//     console.log('Property decorator')
//     console.log("Target : ", target, "PropertyName : ", propertyName);
// }

// // Setter decorator
// // Type 'PropertyDescriptor' describes about the properties of the element.
// function Log1(target: any, setterName: string, descriptor: PropertyDescriptor) {
//     console.log('Accessor decorator')
//     console.log("Target : ", target, "PropertyName : ", setterName);
//     console.log("descriptor : ", descriptor);
// }

// // Method decorator
// function Log2(target: any, methodName: string, descriptor: PropertyDescriptor) {
//     console.log('Method decorator')
//     console.log("Target : ", target, "PropertyName : ", methodName);
//     console.log("descriptor : ", descriptor);
// }

// // Parameter decorator
// // methodName: will be the name of the method in which we used this parameter.
// function Log3 (target: any, methodName: string, argumentNumber: number) {
//     console.log('Parameter decorator')
//     console.log("Target : ", target, "PropertyName : ", methodName);
//     console.log("ArgumentNumber : ", argumentNumber);
// }

// class Product {

//     // Adding a decorator to a property 'title' instead of to a class. Argument(s) received by decorator function depends on where we 
//     // use it. Wehen we apply decorator to a property, decorator receives two arguments : target of the property, name of the property.
//     // For instance property, target will be the prototype of the object created and for static property target refers to construcor
//     // function of it's class.
//     @Log
//     title: string;

//     constructor(t: string, private _price: number) {
//         this.title = t;
//     }

//     // setter is also called accesser.
//     @Log1
//     set price(val: number) {
//         if(val <= 0) {
//             throw new Error('Invalid price - should be postive !!');
//         }

//         this._price = val;
//     }

//     @Log2
//     getPriceWithTax(@Log3 tax: number) {
//         return this._price * tax;
//     }
// }

// ***********************************************************************************************************************************

function Logger3(message: string) {
    console.log("Inside the Logger3 decorator factory");
	return function(cnstctr: Function) {
		console.log(message);
		console.log(cnstctr);
	}
}

// We can event return something from the decorator function and that something depends on where we are using it. When we used with
// class we can return a new Construcor function which will replace the one so which will replace the class to which you added a
// decorator. Returning new class will replace the old one and the new class we are returning is built upon existing (old) class
// as we have extended the old one.
function WithTemplate1(template: string, hookId: string) {
    console.log("Inside the WithTemplate1 decorator factory");

    // new (..._: any[]) : constructor which accepts any number of arguments (used rest operator).
    // {name: string, age: number, height: number} : enforcing that the class we are extending must have these properties.
	return function<T extends {new (..._: any[]): {name: string, age: number, height: number}}>(originalConstructor: T) {

        // We can return new Construcor function or directly class (can or cannot have a name) as class is a just a syntatic sugar
        // (a syntax) to create a new constructor function. We are returning class having no name.
        return class extends originalConstructor {
            height = 30;
            constructor(..._: any) {
                super();
                
                console.log("Inside the WithTemplate1 decorator")
                const hookEL = document.getElementById(hookId);

                if(hookEL) {
                    hookEL.innerHTML = template;
                    hookEL.querySelector('h1')!.textContent = this.name + ' ' + this.age;
                }
            }
        }
	}
}

@Logger3("Multiple Decorators")
@WithTemplate1('<h1>My Person2 Object</h1>', 'app')
class Person3 {
	name = "Gunjan";
    age = 12;
    height = 40;

	constructor() {
		console.log("Creating person object");
	}
}

const per3 = new Person3();
console.log(per3);

// Decorators on properties and parameters can return something but TS will ignore it (return values) are not used for more precise.