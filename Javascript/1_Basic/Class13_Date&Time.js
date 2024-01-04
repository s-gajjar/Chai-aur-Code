let myDate = new Date()
console.log(myDate.toString());
console.log(myDate.toDateString());
console.log(myDate.toLocaleString());
console.log(typeof(myDate));

let myCreatedDate = new Date(2023, 0, 23)
console.log(myCreatedDate.toDateString());

let myAnotherDate = new Date("01-14-2023")
console.log(myAnotherDate.toLocaleString());

let myTimeStamp = Date.now()
console.log(myTimeStamp);
console.log(myAnotherDate.getTime());
console.log("-----------------");
console.log(Math.floor(Date.now()/1000));

let newDate = new Date()
console.log(newDate.getMonth()+1);
console.log(newDate.getDate());

//`${newDate.getDay()}`

console.log(newDate.toLocaleString('default', {
    weekday: "long"
}))