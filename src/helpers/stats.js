const {Post, Comment} = require('../model');

async function postCounter() {
  return await Post.countDocuments();
}

async function commentsCounter() {
  return await Comment.countDocuments();
}

async function postTotalViewsCounter() {
  const result = await Post.aggregate([
    {
      $group: {
        _id: "1",
        viewsTotal: { $sum: "$views" },
      },
    },
  ]);
  let viewsTotal = 0;
  if (result.length > 0) {
    viewsTotal += result[0].viewsTotal;
  }
  return viewsTotal;
}

async function likesTotalCounter() {
  const result = await Post.aggregate([
    {
      $group: {
        _id: "1",
        likesTotal: { $sum: "$likes" },
      },
    },
  ]);

  let likesTotal = 0;
  if (result.length > 0) {
    likesTotal += result[0].likesTotal;
  }
  return likesTotal;
}

module.exports = async () => {
  const results = await Promise.all([
    postCounter(),
    commentsCounter(),
    postTotalViewsCounter(),
    likesTotalCounter(),
  ]);

  return {
    posts: results[0],
    comments: results[1],
    views: results[2],
    likes: results[3],
  };
};
