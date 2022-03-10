var express = require('express');
var router = express.Router();

const home = require('../controllers/home');
const post = require('../controllers/post');

/* GET home page. */
router.get('/', home.index);
router.get('/post/:post_id', post.index);
router.post('/post', post.create);
router.post('/post/:post_id/like', post.like);
router.post('/post/:post_id/comment', post.comment);
router.delete('/post/:post_id', post.delete);
router.get('/', function(req, res, next) {
  res.render('descriptionImage', { title: 'Express' });
});



module.exports = router;
