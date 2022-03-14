// Using Node.js `require()`
const mongoose = require('mongoose');

const url =('mongodb://127.0.0.1:27017')

mongoose.connect(url);

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Error to connect mongodb'))
db.once('open',function callback(){
    console.log('connected to mongodb')     
})  

module.exports = db