const user = {
    username: "Shreyansh",
    price: 999,

    welcomeMessage: function() {
        console.log(`${this.username}, welcome to website`);
    }
}
user.welcomeMessage()
user.username = "sam"
user.welcomeMessage()

console.log("----------");

function chai(){
    let username1= "Shreyansh"
    console.log(this.username1);
}
chai()


//Arrow Function
const dudh = () =>{
    let username1= "Shreyansh"
    console.log(this.username1);
}


const addTwo = (num1, num2) =>  num1 +num2  //after => num1 +num2 will be considered as return statement


console.log(addTwo(2,4));
