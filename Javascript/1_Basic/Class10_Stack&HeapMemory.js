// Primitive DataTypes
//7 types: String, Number, Boolean, Null, Undefined, Symbol, BigInt

const score = 100                   //String
const scoreValue = 100.3            //Number

const isLoggedIn = false            //Boolean
const outSideTemp = null            //Null
let userEmail;                      //Undefined

const id = Symbol('123')            //Symbol
const anotherId = Symbol('123')     //Symbol

console.log(id == anotherId);       //false

const bigNumber =  1234567345623467893467890567n    //n represents BigInt

console.log(typeof(bigNumber));

// Reference DataTypes(Non-Primitive)
// Array, Objects, Functions

const heros = ["Ironman", "Shaktiman", "Nagraj"]    //Array

let myObj = {
    name: "Shreyansh",
    age: 22
}          
//-----------------------------------------------------------------------------
//Stack(Primitive) & Heap Memory(Non-Primitvie)
//Stack memory me copy milta hai

//heap memoery me refernce milta hai original change hoga

//stack me stack hota rehta hai...

let myName = "ShreyanshGajjar"
let myAnotherName = myName

// now isme actually myname se nahi jata "ShreyanshGajjar"
// myName apna copy dega to myAnotherName

let user = {
    email : "user@gmail.com",
    upi : "user@hdfc"
}

// now this will go to Heap

                                        //Object

const myFunction = function(){
    console.log("Hello World");
}

myFunction();                                       //Functions

//-----------------------------------------

