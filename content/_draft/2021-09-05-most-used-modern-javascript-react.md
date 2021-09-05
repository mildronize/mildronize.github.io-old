---
title: Modern Javascript (ES6+) ใน React ที่พบได้บ่อย (แถม TypeScript)
tags:
  - Modern JavaScript
  - ES6+
  - TypeScript
uuid: g4owyyw
unsplashImgCoverId: KXkgOigCqj0
---

สไตล์ของโพสนี่จะเริ่มจาก ES6+ เสมอนะครับ เพื่อให้เห็นอีกมุมนึง

# 1. Commonly used ES6 Features

Ref: https://medium.com/the-andela-way/a-beginners-guide-to-react-with-es6-a2ed0b5c977e

## let and const

use `let` when you plan on re-assigning new values to the variable and `const` if you’re not planning to re-assign a variable.

`var` is always global scope.

```js
let name = 'Thada';
name = 'Mild';
console.log(name);

// Output:
Mild
```

<details>
<summary>Click Me</summary>


#### yes, even hidden code blocks!

```python
print("hello world!")
```


</details>

## The spread operator
```js
const cities = ["Kampala", "Nairobi", "Lagos"];
console.log(...cities);

// Output:
Kampala Nairobi Lagos
```

```js
const east = ["Uganda", "Kenya", "Tanzania"];
const west = ["Nigeria", "Cameroon", "Ghana"];

const countries = [...east, ...west];
console.log(countries);

// Output:
[ 'Uganda', 'Kenya', 'Tanzania', 'Nigeria', 'Cameroon', 'Ghana' ]
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
function greet(name = 'Fellow', greeting = 'Welcome') {
 return `${greeting} ${name}`;
}

console.log(greet()); // Welcome Fellow
console.log(greet('Kagga')); // Welcome Kagga
console.log(greet('Mike', 'Hi')); // Hi Mike
```

## Destructuring

### 1. Extracting data from an array

  ```js
  // ------
  const points = [20, 30, 40];
  const [x, y, z] = points;
  console.log(x, y, z);
  //output
  20 30 40

  // ----
  const points = [20, 30, 40];
  const x = points[0];
  const y = points[1];
  const z = points[2];
  console.log(x, y, z);

  //output
  20 30 40
  ```

  ```js
  const [x, , z] = points
  ```
### 2. Extracting data from an object

  ```js
  // JavaScript ES6+
  const car = {
    type: 'Toyota',
    color: 'Silver',
    model: 2007
  };

  const {type, color, model} = car;

  console.log(type, color, model);
  //output
  Toyota Silver 2007

  // Before ES6+
  const car = {
    type: 'Toyota',
    color: 'Silver',
    model: 2007
    };

  const type = car.type;
  const color = car.color;
  const model = car.model;

  console.log(type, color, model);
  //output
  Toyota Silver 2007
  ```

  ```js
  const {color} = car;
  console.log(color);
  //output
  Silver
  ```

## Object literal Shorthand

```js
let type = 'Toyota';
let color = 'Silver';
let model = 2007;

const car = {
 type,
 color,
 model
};
console.log(car);
//output
{ type: 'Toyota', color: 'Silver', model: 2007 }
```



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
