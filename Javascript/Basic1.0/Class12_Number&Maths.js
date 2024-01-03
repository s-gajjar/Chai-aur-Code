//Number
const score = 400
console.log(score);

const balance = new Number(100)
console.log(balance);

console.log(balance.toString());
console.log(balance.toString().length);
console.log(balance.toFixed(2));

const otherNumber = 23.278
console.log(otherNumber.toPrecision(2));

const hundreds = 1000000
console.log(hundreds.toLocaleString());

///Maths
console.log('-----------------');

console.log(Math);
console.log(Math.abs(-4));  
console.log(Math.round(4.5));
console.log(Math.ceil(4.1));    //it will always go up it will 5 here
console.log(Math.floor(4.9));   //vice versa
console.log(Math.min(3, 5, 6, 2, 5));
console.log(Math.max(3, 5, 6, 2, 5));

console.log(Math.random()); //always b/w 0 and 1

console.log(Math.floor(Math.random()*100)+1); //you got the point bro


console.log("------------");
const min = 10
const max = 20
console.log(Math.floor(Math.random() * (max -min + 1))+ min)    //+1 to avoid 0 case

