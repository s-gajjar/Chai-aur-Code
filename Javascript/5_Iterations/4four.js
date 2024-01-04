const myObject = {
    js: 'Javascript',
    cpp: 'C++',
    rb: 'Ruby',
    swift: 'Swift by Apple'
}

for (const key in myObject) {
    console.log(`${key} shortcut is for:  ${myObject[key]}`);
}

console.log("-------");

const programming = ["js", "rb", "py", "java"]

for (const num in programming) {
    console.log(`${programming[num]}`);
}

console.log("-------");

const map = new Map()
map.set('IN', "India")
map.set('USA', "United States of America")
map.set('FR', "France")
map.set('IN', "India")

for (const key in map) {
    console.log(key);
}

//not iterable so no output