// // Code goes here!
// import _ from 'lodash';

// // This basically says TS don't worry, GLOBAL will exist.
// declare var GLOBAL: any;    // (see index.html file)

// // There are certain 3rd party libraries which don't have TS specific implementation, only have JS. We need to convert JS implementation
// // to TS and for this we use @types for correspondng 3rd party library.
// console.log(_.shuffle([1, 2, 3, 4, 5]));
// console.log(GLOBAL);

// ****************************************************************************************************************************************

import "reflect-metadata";
import { plainToClass } from 'class-transformer';
import { Product } from './product.model';

import { validate } from 'class-validator';

// Saying products comming from the server (database)
const products = [
    {title: 'A', price: 12},
    {title: 'B', price: 232},
];

// Converting into class Product
// 1) ................... using map() by ourself
// const loadedProducts = products.map(prod => new Product(prod.title, prod.price));

// 2) ............... using 3rd party library named 'class-transformer'.
const loadedProducts = plainToClass(Product, products);

for(const p1 of loadedProducts) {
    console.log(p1.getInfo());
}


const newProd = new Product('', -5.99);

// There is no catch() method/block. Always lands in the then() block though having error.
validate(newProd).then(errors => {
    if(errors.length > 0) {
        console.log('Validation Errors! ', errors);
    } else {
        console.log(newProd.getInfo());
    }
});