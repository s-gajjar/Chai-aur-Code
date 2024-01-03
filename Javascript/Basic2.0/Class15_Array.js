const marvelHeroes = ["thor" , "Ironman", "spiderman"]
const dcHeroes = ["superman", "flash", "batman"]

//marvelHeroes.push(dcHeroes)

//console.log(marvelHeroes);

const allHeros = marvelHeroes.concat(dcHeroes)
console.log(allHeros);

console.log("------------");

const allnewHeroes = [...marvelHeroes, ...dcHeroes]
console.log(allnewHeroes);      //preferable

const anotherArr = [1, 2, 3, [4, 5, 6], 7, [6, 7, [4,5]]]
const ususableAnotherArr = anotherArr.flat(Infinity)
console.log(ususableAnotherArr);

console.log("------------");
console.log(Array.isArray("Shreyansh"));
console.log(Array.from("Shreyansh"));
console.log(Array.from({name : "Shreyansh"}));  //interesing

let score1 = 100
let score2 = 200
let score3 = 300

console.log(Array.of(score1, score2, score3));

