
const mongoose = require('mongoose');

const {database} = require('./keys');

mongoose.connect(database.URI, {
    useNewUrlParser: true
})
    .then(DB => console.log('connect to DB'))
    .catch(err => console.error(err));