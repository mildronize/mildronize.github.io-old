---
title: Modern Javascript (ES6+) ใน React ที่พบได้บ่อย (แถม TypeScript)
tags:
  - Modern JavaScript
  - ES6
  - TypeScript
uuid: g4owyyw
unsplashImgCoverId: KXkgOigCqj0
---

สไตล์ของโพสนี่จะเริ่มจาก ES6+ เสมอนะครับ เพื่อให้เห็นอีกมุมนึง

ES6+ คือ

# 1. Commonly used ES6 Features

Ref: https://medium.com/the-andela-way/a-beginners-guide-to-react-with-es6-a2ed0b5c977e

## let and const

use `let` when you plan on re-assigning new values to the variable and `const` if you’re not planning to re-assign a variable.

```js
let name = 'Thada';
name = 'Mild';
console.log(name);

// Output:
Mild
```

<details>
<summary>การใช้ `var` ใน JavaScript ก่อน ES6</summary>

`var` is always global scope.

</details>

## The spread operator
```js
const animals = ["Cat", "Dog", "Elephant"];
console.log(...animals);

// Output:
Cat Dog Elephant
```

```js
const animals = ["Cat", "Dog", "Elephant"];;
const moreAnimals = ["Ant", "Cow", "Horse"];

const allAnimals = [...animals, ...moreAnimals];
console.log(allAnimals);

// Output:
[ 'Cat', 'Dog', 'Elephant', 'Ant', 'Cow', 'Horse' ]
```
## Template literals

```js
const name = "Thada";
const message = `Hello ${name}`;
//
const message = `Hello ${name.toUpperCase()}`;
```



## Default function parameters

```js
function hello(name = 'Thada', greeting = 'Welcome') {
 return `${greeting} ${name}`;
}

console.log(hello()); // Welcome Thada
console.log(hello('Somchai')); // Welcome Somchai
console.log(hello('Chana', 'Hi')); // Hi Chana
```

## Destructuring

### 1. Extracting data from an array

```js
const points = [3, 5, 10];
const [x, y, z] = points;
console.log(x, y, z);

//output
3 5 10
```

<details>
<summary>คำอธิบายใน JavaScript ก่อน ES6</summary>

```js
const points = [3, 5, 10];
const x = points[0];
const y = points[1];
const z = points[2];
console.log(x, y, z);

//output
3 5 10
```

</details>

```js
const [x, , z] = points
```
### 2. Extracting data from an object

```js
// JavaScript ES6+
const author = {
  name: 'Thada',
  age: 28,
  location: 'Thailand'
};

const {name, age, location} = author;

console.log(name, age, location);
//output
Thada 28 Thailand
```

<details>
<summary>คำอธิบายใน JavaScript ก่อน ES6</summary>

```js
// Before ES6+
const author = {
  name: 'Thada',
  age: 28,
  location: 'Thailand'
};

const name = car.name;
const age = car.age;
const location = car.location;

console.log(name, age, location);
//output
Thada 28 Thailand
```

</details>

```js
const { location } = author;
console.log(location);
//output
Thailand
```

Rename

```js
const { location: country } = author;
console.log(country);
//output
Silver
```

## Object literal Shorthand

```js
let name = 'Thada';
let age = 28;
let location = 'Thailand';

const author = {
 name,
 age,
 location
};

console.log(author);
//output
{ name: 'Thada', age: 28, location: 'Thailand' }
```

<details>
<summary>คำอธิบายใน JavaScript ก่อน ES6</summary>

```js
// Before ES6+
const car = {
  name: name,
  age: age,
  location: location,
};
```

</details>

## Arrow Function

```js
// JavaScript ES6+
const addNumber = (num1, num2) =>  num1 + num2;

// Before ES6+
function addNumber(num1, num2) {
  return num1 + num2;
}
```


# 2. Commonly used ES6 on React

```jsx
import React from "react";

function Form() {
  const [state, setState] = React.useState({
    firstName: "",
    lastName: ""
  });

  function handleChange(evt) {
    const value = evt.target.value;
    setState({
      ...state,
      [evt.target.name]: value
    });
  }

  return (
    <>
      firstName:
      <input name="firstName" value={state.firstName} onChange={handleChange} />
      lastName:
      <input name="lastName" value={state.lastName} onChange={handleChange} />
    </>
  );
}
```

https://www.pluralsight.com/guides/handling-multiple-inputs-with-single-onchange-handler-react

# Import & Export Pattern

[React Import & Export Component Pattern](/react-import-export-component-pattern-whaab42/)


# Promise

```ts
// Ref: from redux-toolkits starter template
// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
    return new Promise<{ data: number }>((resolve) =>
      setTimeout(() => resolve({ data: amount }), 500)
    );
  }
```
