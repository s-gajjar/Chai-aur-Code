const coding = ["js", "ruby", "java", "ruby", "cpp"]

coding.forEach(function (val){
    console.log(val);
})
console.log("-------");

coding.forEach((val) => {
    console.log(val);
})

console.log("-------");

function printMe(item){
    console.log(item);
}
coding.forEach(printMe)

console.log("-------");

coding.forEach( (item, index, arr) => {
    console.log(item, index, arr);
})

console.log("-------");

const myCoding = [
    {
        languageNmae : "javascipt",
        languageFileName : "js"
    },
    {
        languageNmae : "java",
        languageFileName : "java"
    },
    {
        languageNmae : "python",
        languageFileName : "py"
    }
]

myCoding.forEach((item)=>{
    console.log(item.languageFileName);
})