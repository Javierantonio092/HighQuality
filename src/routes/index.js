const express = require('express');
const router = express.Router();


const home = require('../controllers/home');
const post = require('../controllers/post');
//const user = require('../controllers/users');

/* GET home page. */
module.exports = app =>{
  router.get('/', home.index);

  router.get('/posts/:post_id', post.index);
  router.post('/post', post.create);
  router.post('/posts/:post_id/like', post.like);
  router.post('/posts/:post_id/comment', post.comment);
  router.delete('/posts/:post_id', post.delete);
  

  app.use(router);
};





