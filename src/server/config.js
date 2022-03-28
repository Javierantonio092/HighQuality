const path = require('path');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const multer = require('multer');
const express = require('express');
const errorHandler = require('errorhandler');
const flash = require("connect-flash");
const session = require ("express-session");
const passport = require ("passport");
const indexRoutes = require('../routes/index');
const authRoutes = require('../routes/auth');


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
    app.set('view engine','.hbs');

    //Uploads Settings
    app.use(multer({ dest: "./uploads" }).single("post"));
 

    //middlewares
    app.use(morgan('dev'));
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());

    app.use(
        session({
          secret: "somesecretkey",
          resave: true,
          saveUninitialized: true,
        })
    );
    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());

    // Global Variables
    app.use((req, res, next) => {
    // the curren user session
    app.locals.user = req.user || null;
    // succes messages by flash
    app.locals.success = req.flash("success");
    // passport authentication erros
    app.locals.error = req.flash("error");
    next();
  });

  
    //routers
    indexRoutes(app);
    authRoutes(app);

    //static files
    app.use('/public',express.static(path.join(__dirname, '../public')));
    app.use("/uploads", express.static("./uploads"));

    // errorhanddlers
    if('development'== app.get('env')){
        app.use(errorHandler);
    }

    return app;
 
}