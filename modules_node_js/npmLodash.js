const _ = require("lodash");

var defaults = _.defaults({ a: 1 }, { a: 3, b: 2 });
console.log("defaults:", defaults);
var partition = _.partition([1, 2, 3, 4], (n) => n % 2);
console.log("partition:", partition);

console.log(_.now())