//Arrays

const myArr = [0, 1, 2, 3, 4, 5]
const myHeroes = ["Shaktiman", "Naaggraj"]
const myArr2 = new Array(1, 2, 3, 4)

console.log(myArr[0]);
console.log(myArr2[0]);

//Array Methods
myArr.push(6)
console.log(myArr);

myArr.pop()
console.log(myArr);

myArr.unshift(7)
console.log(myArr);

myArr.shift()
console.log(myArr);

console.log("---------");

console.log(myArr.includes(5));
console.log(myArr);

console.log(myArr.indexOf(2));
console.log(myArr);

const newArr = myArr.join()
console.log(newArr);
console.log(myArr);

console.log(typeof(newArr));    //it got string from object from join method

//slice, splice

console.log("--------------");
console.log("A ", myArr);
const myn1 = myArr.slice(1,3)   //3rd wont include
console.log(myn1);
console.log("B ", myArr );

const myn2 = myArr.splice(1,3)  //
console.log("C ", myArr );
console.log(myn2);              