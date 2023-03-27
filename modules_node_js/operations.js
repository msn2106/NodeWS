module.exports.add = function (a, b) {
  return a + b;
};

var multiply = function (a, b) {
  return a * b;
};

exports.subtract = function (a, b) {
  return a - b;
};

// module keyword used to reference the current module
// module keyword is not neccessary to export - only export can also be used
// exports keyword used to export the current module
// exports is a shortcut for module.exports
// exports is a reference to module.exports
// exports is a reference to the object that is returned when require() is called
// exports object holds all the exported value in key - value pair format, like add : function definition
