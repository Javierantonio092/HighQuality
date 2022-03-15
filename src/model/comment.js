const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const CommentSchema = new Schema({
    post_id: {type: ObjectId},
    user_id:{type: String},
    username:{type: String},
    timestamp:{type: Date, defult: Date.now},
    Comment:{type: String}
})

module.exports = model('Comment', CommentSchema);

