'use strict';

var app = module.exports = {
  one: function () {
    console.log('one /via foo');
  },
  two: function () {
    console.log('two: foo');
  },
  val: 0
};

app.val = 10;


setInterval(function () {
  app.val += 20;
  console.log(this);
}.bind(this), 200);



 //# sourceURL=foo.js