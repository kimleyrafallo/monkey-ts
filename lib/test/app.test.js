"use strict";

var _globals = require("@jest/globals");
var _app = require("../src/app");
(0, _globals.describe)('IsAdult', () => {
  (0, _globals.it)('Should be adult when age is 16.', () => {
    const user = {
      name: 'kimley',
      age: 26
    };
    (0, _globals.expect)((0, _app.isAdult)(user)).toBeTruthy();
  });
});