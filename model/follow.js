const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;

const FollowSchema = new Schema({    
    user_id:{type:ObjectId},
    followed:{type: String},
})

module.exports = model('Comment', FollowSchema);
