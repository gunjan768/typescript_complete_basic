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
// // We can return 'PropertyDescriptor' from method decorator which allows us to change the method or change the configuration of the method.
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

// class Product1 {

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

// class Printer {
//     message = "This works!";

//     showMessage() {
//         console.log(this.message);
//     }
// }

// const p = new Printer();

// const button = document.querySelector('button')!;

// We we call p.showMessage then reference of 'button' will be passed in 'this' to the class Printer that is 'this' will refer to button 
// instead to referring to the object (p) of the class Printer. 
// button.addEventListener('click', p.showMessage);

// Here 'this' will contain the reference of object 'p' as we are explicitly passing.
// button.addEventListener('click', p.showMessage.bind(p));


// There is the second way of overcoming the problem using decorator and PropertyDescriptor. Basically we are returning the 
// PropertyDescriptor from the method decorator which will replace the original 'PropertyDescriptor' of the showMessage()
// (a function to which we applied our decorator 'Autobind') from the new 'PropertyDescriptor'.
function Autobind(_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    // console.log("Inside the Autobind decorator function")

    // descriptor.value is equals to whole showMessage() function.
    const originalMethod = descriptor.value;
    
    // console.log("Descriptor : ", descriptor);

    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,

        // We have added a getter, a function or property that holds a function which is same so that we cab execute some extra logic
        // when users try to access this property. So that we don't just directly execute the value of this properties and we step in
        // and do some extra work before that. Previously there was no getter method but we added it in the new PropertyDescriptor
        // for the showMessage() method.
        get() {

            // 'this' refers to whatever is responsible for triggering this get() method. Getter method will be triggered by the
            // concrete object to which it belongs i.e this getter method will always refer to the object on which we defined the
            // getter.
            const boundFuntion = originalMethod.bind(this);

            return boundFuntion;
        }
    };

    return adjDescriptor;
}

class Printer1 {
    message = "This works using decorator and PropertyDescriptor!";

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p1 = new Printer1();

const button1 = document.querySelector('button')!;
button1.addEventListener('click', p1.showMessage);


// ************************************************ Decorators for validation ********************************************************

interface ValidationConfig {
    [property: string]: {
        [validatableProp: string]: string[]
    }
}

const registeredValidators: ValidationConfig = {};

function Required(target: any, propName: string) {

    // console.log("RegisteredValidators : ", registeredValidators);
    // console.log("Target : ", target);
    // console.log("PropertyName : ", propName);

    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['required']
    }

    console.log("RegisteredValidators : ", registeredValidators);
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: ['positive']
    }
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];

    console.log("CreatedCourse : ", obj);
    // console.log("objValidatorConfig : ", objValidatorConfig);

    if(!objValidatorConfig) {
        return true;
    }

    let isValid = true;
    
    // for in loop used for object, array etc. It works on key (for array key = index).
    for(const prop in objValidatorConfig) {

        // console.log(prop);

        // for of loop is used for iterable objects like array, map, set etc. It works on value like for(auto:v) in c++.
        for(const validator of objValidatorConfig[prop]) {

            switch(validator) {

                case 'required': {
                    isValid =  isValid && !!obj[prop];

                    break;
                }

                case 'positive': {
                    isValid = isValid && obj[prop] > 0;
                    
                    break;
                }
            }
        }
    }

    return isValid;
}

class Course {

    @Required
    title: string;

    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const CourseForm = document.querySelector('form')!;

CourseForm.addEventListener('submit', event => {
    event.preventDefault();

    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again');
        return;
    }

    console.log(createdCourse);
});

// ************************************************ Decorators for validation ********************************************************