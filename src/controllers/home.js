const ctrl= {}; 

const {Post} = require('../model');

ctrl.index  = async (req, res) =>{
  const posts = await Post.find().sort({timestamp: -1}); 
  res.render('post', {posts});
};

module.exports = ctrl;