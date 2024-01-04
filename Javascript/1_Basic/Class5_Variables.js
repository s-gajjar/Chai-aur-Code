const accountId = 144553
let accountEmail = "okok212@gmail.com"
var accountPassword = "12345"
accountCity = "Ahmedabad"
let accountState

/*
    var should be not used anywhere, its problematic in js
    (issue in block scope & functional scope)
*/

//accountId = 2     can't be changed | not allowed
accountEmail = "ok@gmail.com"
accountCity = "Surat"
accountPassword = "12423121"

console.log(accountId);
console.table([accountId, accountEmail, accountPassword, accountState])