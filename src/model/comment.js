const {Schema, model} = require('mongoose');

const mongooseLeanVirtuals = require('mongoose-lean-virtuals');

const CommentSchema = new Schema(
  {
    post_id: {type: Schema.Types.ObjectId},
    email: { type: String },
    name: { type: String },
    gravatar: { type: String },
    comment:{type: String},
    timestamp: { type: Date, default: Date.now },
    
  },
  {
    versionKey: false,
  }
);

CommentSchema.plugin(mongooseLeanVirtuals);

CommentSchema.virtual("post")
  .set(function (post) {
    this._post = post;
  })
  .get(function () {
    return this._post;
  });

module.exports = model('Comment', CommentSchema);

