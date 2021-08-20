
https://advancedweb.hu/how-to-use-async-functions-with-array-filter-in-javascript/

```js
export const asyncFilter = async (arr, predicate) => {
  const results = await Promise.all(arr.map(predicate));
  return arr.filter((_v, index) => results[index]);
};
```
