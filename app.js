'use strict';
var unique = require('./uniq');

var foo = require('./foo');

var data = [1, 2, 2, 3, 4, 5, 5, 5, 6];

console.log(unique(data));
foo.two();


setInterval(function () {
console.log(foo.val);    
foo.two();
}, 400);