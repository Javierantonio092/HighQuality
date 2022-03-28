const {Post, User} = require('../model');

module.exports = {
  async popular() {
    const posts = await Post.find()
      .limit(9)
      .sort({ likes: -1 })
      .lean({ virtuals: true });

   
  
    return posts;
  },
};
