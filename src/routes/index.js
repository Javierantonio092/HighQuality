const express = require('express');
const router = express.Router();


const home = require('../controllers/home');
const post = require('../controllers/post');

/* GET home page. */
module.exports = app =>{
  router.get('/', home.index);

  router.get('/posts/:post_id', post.index);
  router.post('/post', post.create);
  router.post('/post/:post_id/like', post.like);
  router.post('/posts/:post_id/comment', post.comment);
  router.delete('/post/:post_id', post.delete);
  // router.get('/', function(req, res, next) {
  //   res.render('descriptionImage', { title: 'Express' });
  // });

  app.use(router);
};





//module.exports = router;
