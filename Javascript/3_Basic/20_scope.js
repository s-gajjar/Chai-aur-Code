/*
if(true){
    let a = 10
    const b = 20
    var c = 30
}

console.log(a);
console.log(b);
console.log(c);

//30 will come out, where this is problem (let, const) wont come out of if statement
*/

let a = 200
if(true){
    let a = 10
    const b = 20
    console.log(`Inner ${a}`);
}
console.log(a);

//Class21 was functions with objects and array in js
console.log("--------------");
//Class22
//Scope Level & mini Hoisting
//nested scope

function one(){
    const username = "Shreyansh"

    function two(){
        const website = "Google"
        console.log(username);
    }
    //console.log(website);

    two()
}
//one()
console.log("--------");
if(true){
    const username = "ss"
    if( username === "ss"){
        const website = "Google"
        console.log(username + website);
    }
    //console.log(website);
}
//console.log(username);


//-----------------Interesting----------------------

function addone(num){

    return num+1
}
addone(5)
//I can take this addone(5) before function and it will run, but in the expression one it will give error


//Expression this is also function only
const addTwo = function(num){
    return num+2
}