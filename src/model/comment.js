const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const CommentSchema = new Schema(
    {
        post_id: {type: ObjectId},
        email: { type: String },
        name: { type: String },
        gravatar: { type: String },
        timestamp: { type: Date, default: Date.now },
        Comment:{type: String}
    },
    {
        versionKey: false,
    }
);

CommentSchema.virtual("post")
  .set(function (post) {
    this._post = post;
  })
  .get(function () {
    return this._post;
  });

module.exports = model('Comment', CommentSchema);

