const {Post, Comment} = require('../model');

module.exports = {
  async newest() {
    const comments = await Comment.find().limit(5).sort({ timestamp: -1 });

    for (const comment of comments) {
      const post = await Post.findOne({ _id: comment.post_id });
      comment.post = post;
    }

    return comments;
  },
};
