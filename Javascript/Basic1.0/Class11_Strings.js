const name = "Shreyansh"
const repoCount = 50

//console.log(name + repoCount);

console.log(`Hello my name is ${name} and I have ${repoCount} repoitaris`);

const gameName = new String(`Shreyansh-sg`)

console.log(gameName[0]);
console.log(gameName.__proto__);    //object mila check in conosole log in chrome

console.log(gameName.length);
console.log(gameName.toUpperCase());
console.log(gameName);
// as per stack and heap original name change nahi hua hai

console.log(gameName.charAt(2));
console.log(gameName.indexOf('h'));

const newString = gameName.substring(0, 4)
console.log(newString);

const anotherStrign = gameName.slice(1,6);
console.log(anotherStrign);

const newStringOne = "     Shreyansh   "
console.log(newStringOne);
console.log(newStringOne.trim());

//replace
//include

console.log(gameName.includes("Shre")); //true

console.log(gameName.split('-'));