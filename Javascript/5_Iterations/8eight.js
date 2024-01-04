const myNums = [1,2,3]
/*
const myTotal = myNums.reduce(function(accumulator, currentValue){
    console.log(`accumulator: ${accumulator} and current value ${currentValue}`);
    return accumulator + currentValue
}, 0)
*/

const myTotal = myNums.reduce((acc,curr)=> acc+curr, 0)
console.log(myTotal);

const shoopingCart = [
    {
        itemName: "js course",
        price: 2999
    },
    {
        itemName: "python",
        price: 299
    },
    {
        itemName: "reactnative",
        price: 4999
    },
    {
        itemName: "DSA",
        price: 6999
    }
]

const myShoppingTotal = shoopingCart.reduce((acc, item)=> acc+item.price, 0)
console.log(myShoppingTotal);