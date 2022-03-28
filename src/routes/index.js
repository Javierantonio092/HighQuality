const express = require('express');
const router = express.Router();


const home = require('../controllers/home');
const post = require('../controllers/post');
const index = require('../controllers/index');

/* GET home page. */
module.exports = app =>{
  router.get('/', index.index);
  
  router.get('/posts/:post_id', post.index);
  router.post('/post', post.create);
  router.post('/posts/:post_id/like', post.like);
  router.post('/posts/:post_id/comment', post.comment);
  router.delete('/posts/:post_id', post.delete);
 

  app.use(router);
};


