const Stats = require ('./stats');
const Posts = require ('./posts');
const Comments = require ('./comments');

module.exports = async function (viewModel) {
  
  const results = await Promise.all([
    Stats(),
    Posts.popular(),
    Comments.newest(),
  ]);

  viewModel.sidebar = {
    stats: results[0],
    popular: results[1],
    comments: results[2],
  };

  return viewModel;
};
