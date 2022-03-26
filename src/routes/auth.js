const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');


module.exports = app =>{
    router.get("/auth/signin", auth.renderSignIn);
    router.post("/auth/signin", auth.signIn);
    router.get("/auth/signup", auth.renderSignUp);
    router.post("/auth/signup", auth.signUp);
    router.get("/auth/logout", auth.logout);
    router.get("/profile", auth.profile);

    app.use(router);
};