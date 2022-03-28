const ctrl= {}; 

const {Post} = require('../model');

ctrl.index  = async (req, res, next) =>{
  try {
    const posts = await Post.find({})
      .sort({timestamp: -1})
      .lean({ virtuals: true });

    const viewModel = { posts: [] };
    viewModel.posts = posts; 
    res.render('index', { layout: "nostats", posts: posts} );
  } catch (error) {
    next(error);
  }
};

module.exports = ctrl;

