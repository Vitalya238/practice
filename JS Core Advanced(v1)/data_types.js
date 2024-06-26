function areObjectsEqual(obj1, obj2) {
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  if (keys1.length !== keys2.length) {
    return false;
  }

  for (let key of keys1) {
    if (!obj2.hasOwnProperty(key) || obj1[key] !== obj2[key]) {
      return false;
    }
  }

  return true;
}

const objA = { a: 1, b: 2, c: 3 };
const objB = { a: 1, b: 2, c: 3 };
const objC = { a: 1, b: 2, c: 4 };

console.log(areObjectsEqual(objA, objB)); // true
console.log(areObjectsEqual(objA, objC)); // false
