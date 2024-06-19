"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isAdult(user) {
    return user.age >= 18;
}
const kimley = {
    name: 'Kimley',
    age: 26
};
if (isAdult(kimley)) {
    console.log(kimley.name + ' is an adult.');
}
else {
    console.log(kimley.name + ' is not an adult.');
}
