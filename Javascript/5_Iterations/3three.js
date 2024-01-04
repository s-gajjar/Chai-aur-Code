//for of

    // ["", "", ""]
    // [{}, {}, {}]

    const arr = [1, 2, 3, 4, 5]

    for (const num of arr) {
        console.log(num);
    }

    console.log("-------");

    const greetings = "Hello World"
    for (const greet of greetings) {
        console.log(`Each char is ${greet}`);
    }

    console.log("-------");


//Maps

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('FR', "France")
map.set('IN', "India")

console.log(map);

console.log("-------");

for (const [key, value] of map) {
    console.log(key, ':- ', value);
    
}

// const myObject = {
//     'game1' : 'GTA5',
//     'game2' : 'GTA6'
// }

// for (const [key, value] of myObject) {
//     console.log(key, ':- ', value);
// }

//maps are iteratable normally, object are not, they need some more syntax to make it iteratable