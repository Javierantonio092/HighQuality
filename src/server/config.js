const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const routes = require('../routes/index');



module.exports = app => {
    //settings
    app.set('port', process.env.PORT || '3000');
    app.set('views', path.join(__dirname, "../views"));
    app.engine('.hbs', exphbs.engine({
        defaultLayout: 'main',
        partialsDir: path.join(app.get('views'), 'partials'),
        layoutsDir: path.join(app.get('views'), 'layouts'),
        extname: '.hbs',
        helpers: require('./helpers')
    }));
    app.set('view engine', '.hbs');

    //Uploads Settings
    app.use(multer({ dest: "./uploads" }).single("post"));
 

    //middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    //routers
    routes(app);   
    //static files
    app.use('/public',express.static(path.join(__dirname, '../public')));
    app.use("/uploads", express.static("./uploads"));

    // errorhanddlers
    if('development'== app.get('env')){
        app.use(errorHandler);
    }

    return app;
 
}

