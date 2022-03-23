const ctrl= {}; 

const {Post} = require('../model');

ctrl.index  = async (req, res, next) =>{
  try {
    const posts = await Post.find()
      .sort({timestamp: -1})
      .lean({ virtuals: true });

    let viewModel = { posts: [] };
    viewModel.posts = posts; 
    res.render('post', viewModel);
  } catch (error) {
    next(error);
  }
};

module.exports = ctrl;