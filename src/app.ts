type User = {
  name: string;
  age: number;
}

function isAdult(user: User): boolean {
  return user.age >= 18;
}

const kimley: User = {
  name: 'Kimley',
  age: 26
};

if(isAdult(kimley)){
  console.log(kimley.name + ' is an adult.');
} else {
  console.log(kimley.name + ' is not an adult.');
}


