//singleton
//Object.create


//object literals

const mySym = Symbol("key1")

const jsUser = {
    name: "Shreyansh",
    "fullname" : "Shreyansh Gajjar",
    [mySym] : "mykey1",
    age : 18,
    location : "Ahmedabad",
    email : "email@gmail.com",
    isLoggedIn: false,
    lastLoggedIn : ["Monday", "Saturday"]
}

console.log(jsUser["email"]);
console.log(jsUser["fullname"]);    //true way for calling objects
console.log(jsUser[mySym]);
console.log(typeof(mySym));

jsUser.email = "google@gmail.com"
console.log(jsUser["email"]);

//freezed our object here
//Object.freeze(jsUser)
//jsUser.email = "micro@gmail.com"
//console.log(jsUser["email"]);

console.log("-------");

jsUser.greeting = function(){
    console.log("Hello JS User");
}

console.log(jsUser.greeting());


jsUser.greeting2 = function(){
    console.log(`Hello Js user, ${this.name}`);
}

console.log(jsUser.greeting2());