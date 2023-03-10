const crypto = require('crypto')

// console will display a buffer key if we do not use .toString('hex)
const key1 = crypto.randomBytes(32).toString('hex')
const key2 = crypto.randomBytes(32).toString('hex')
console.table({key1, key2}) 


// nodemon ./helpers/generateKeys.js