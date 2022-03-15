const {Schema, model} = require('mongoose');
const {ObjectId} = Schema;
const path = require('path');

const PostSchema = new Schema({
    user_id:{type: ObjectId},
    title:{type: String},
    timestamp:{type: Date, defult: Date.now},
    fileName:{type: String},
    filesSize:{type: Number},
    description:{type: String},
    views:{type: Number, default: 0},
    likes:{type: Number, default: 0}
})

PostSchema.vietual('uniqueId')
    .get(function(){
        return this.filename.remplace(path.extname(this.fileName), '')
    });
module.exports = model('Comment', PostSchema);

