const {Schema, model} = require('mongoose');
//const {ObjectId} = Schema;
const path = require('path');
//import mongooseLeanVirtuals from "mongoose-lean-virtuals";

const PostSchema = new Schema({
   // user_id:{type: ObjectId},
    title:{type: String},    
    fileName:{type: String},
    filesSize:{type: Number},
    description:{type: String},
    views:{type: Number, default: 0},
    timestamp: {type: Date, default: Date.now},
    likes:{type: Number, default: 0}
});
//PostSchema.plugin(mongooseLeanVirtuals);
PostSchema.virtual('uniqueId')
    .get(function () {
        return this.fileName.replace(path.extname(this.fileName), '')
    });

module.exports = model('Post', PostSchema);

