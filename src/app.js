const express = require ('express');
 
const config = require ('./server/config')
//database
require('./database');
require('./config/passport')

const app = config(express());

//starting server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});