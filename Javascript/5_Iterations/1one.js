//for

for (let i = 0; i < 10; i++) {
    const element = i;
    if (element == 5) {
        console.log("5 is best number");
    }

    console.log(element);
}

for (let i = 0; i <= 10 ; i++) {
    console.log(`Outer Loop ${i}`);
    for (let j = 0; j <= 10; j++) {
        //console.log(`Inner Loop value ${j} and inner loop ${i}`);
        console.log(i + '*' + j + '=' + i*j);
    }    
}

console.log("---------");

let myArray = ["flash", "Batman", "superman"]
console.log(myArray.length);
for (let index = 0; index < myArray.length; index++) {
    const element1 = myArray[index];
    console.log(element1);
}

console.log("---------");
//break and continue

for (let index = 1; index <= 20; index++) {
    if(index == 5){
        console.log("detected 5");
        break;
    }
    console.log(`Value of i is ${index}`);
} 

console.log("-----------");
for (let index = 1; index <= 20; index++) {
    if(index == 5){
        console.log("detected 5");
        continue
    }
    console.log(`Value of i is ${index}`);
} 