// const operations = require('operations') // This will also work as both are in same directory
// const operations = require('./operations.js') // "./" represent current directory (not neccessary though) - also ".js" not neccessary too
const operations = require('./operations');
// const suboperations = require('sub_module/suboperations') // This will not work & will give error Cannot find module
const suboperations = require('./sub_module/suboperations')
const parentOperations = require('../index') // This is the way to import something exported from parent directory - "each pair of ../" - moves you up one directory

console.log(operations.add(1, 2));

// console.log(operations.multiply(1, 2)); // multiply is not exported - so it not available to be used outside of its module

console.log(operations.subtract(1, 2));

console.log(suboperations.divide(1, 2));

console.log(parentOperations.add(1, 2));
