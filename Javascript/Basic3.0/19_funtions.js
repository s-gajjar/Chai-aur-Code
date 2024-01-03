/*
function sayMyname(){
    console.log(("Shreyansh"));
}
sayMyname()

function addTwoNumber(num1, num2){
    return num1+num2;
}

const result = addTwoNumber(3,4)

console.log(`Result: ${result}`);

console.log("-------------");

function loginUserMessage(username){
    if(!username){
        console.log("Please enter username");
        return
    }
    return `${username} just logged in`
}

console.log(loginUserMessage("Shreyansh"));
console.log(loginUserMessage());
*/
//Class20
console.log("-----------------");

//ecommerce example

function calculateCartPrice(val1,val2, ...num1){
    return num1
}

console.log(calculateCartPrice(200, 400, 300, 2000));

const user = {
    username : "Shreyansh",
    price: 199
}

function handleObject(anyObject){
    console.log(`Username is ${anyObject.username} & price is ${anyObject.price}`);
}

//handleObject(user)

handleObject({
    username: "sam",
    price: 8909
})

const myNewArray = [200, 400, 100, 600]
function returnSecondValue(getArray){
    
    return getArray[1]
}

console.log(returnSecondValue(myNewArray));