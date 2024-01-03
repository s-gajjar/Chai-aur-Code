const userEmail = []

if(userEmail){
    console.log("got user's emails");
}else{
    console.log("Dont have user Email ");
}

//falsy values
//false, 0, -0, BigInt 0n, "", null, undefinded, NaN(not a number)

//truthy values
// "0", 'false', " ", [], {}, function(){}

if (userEmail.length === 0) {
    console.log("Array is Empty");    
}

console.log("-----------");

const emptyObj = {}
if(Object.keys(emptyObj).length === 0){
    console.log("Object is Empty");
}
console.log("-----------");

//Nullish Coalescing Operator (??) -- Null undefined

let val1;
// val1 = 5 ?? 10
val1 = null ?? 10


console.log(val1);

console.log("-----------");


//Terniary Operator
//condition ? true : false

const iceTea = 100
iceTea <= 80 ? console.log("less than 80") : console.log("more than 80")