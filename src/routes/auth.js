const express = require('express');
const router = express.Router();


const auth = require('../controllers/auth');
const home = require('../controllers/home');

module.exports = app =>{
    router.get("/auth/signin", auth.renderSignIn);
    router.post("/auth/signin", auth.signIn);
    router.get("/auth/signup", auth.renderSignUp);
    router.post("/auth/signup", auth.signUp);
    router.get("/auth/logout", auth.logout);
    router.get("/profile", auth.profile);
    router.get('/post', home.index);
    router.get("/indexAdmin", auth.indexAdmin);
    app.use(router);
};