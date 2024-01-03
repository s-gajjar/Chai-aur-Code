//if

const isUserLoggedIn = true
const temperature = 20

if ( 2 === '2') {
    console.log("executed");
}

if (temperature<25) {
    console.log("less than 25");
}else{
    console.log("temperatue is greater than 50");
}
// >, <, <=, >=, ==, !=, ===, !===

console.log("--------------");

const score = 200
if(score>100){
    const power = "fly"
    console.log(`User Power: ${power}`);
}
//console.log(`User Power: ${power}`);

console.log("--------------");

const balance = 1000
if (balance < 500) {
    console.log("more than 500");
}else if (balance <750) {
    console.log(`more than 750`);
}else if (balance <900) {
    console.log(`more than 900`);
}else{
    console.log(`less than 1200 its ${balance}`);
}

console.log("--------------");

const userLoggedIn = true
const debitCard = true
const loggedInFromGoogle = false
const loggedInFromEmail = true

if(userLoggedIn && debitCard ){
    console.log("Allow to buy course ");
}

if(loggedInFromGoogle || loggedInFromEmail){
    console.log("Also Allow to buy course");
}

