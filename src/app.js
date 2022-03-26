const express = require ('express');
const config = require ('./server/config')

//database
require('./database');
<<<<<<< HEAD
=======
require('./config/passport')
>>>>>>> Grbranch

const app = config(express());

app.use(app);
//starting server
app.listen(app.get('port'), () => {
  console.log('server on port', app.get('port'));
});