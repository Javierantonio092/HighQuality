const {Schema, model} = require('mongoose');
const path = require('path');
const mongooseLeanVirtuals = require('mongoose-lean-virtuals');


const PostSchema = new Schema(
    {
        user: {type: String},
        title:{type: String},    
        fileName:{type: String},
        filesSize:{type: Number},
        description:{type: String},
        views:{type: Number, default: 0},
        timestamp: {type: Date, default: Date.now},
        likes:{type: Number, default: 0}
    },
    {
        versionKey: false,
        timestamps: true,
    }
);

PostSchema.plugin(mongooseLeanVirtuals);


PostSchema.virtual('uniqueId')
    .get(function () {
        return this.fileName.replace(path.extname(this.fileName), '')
    });

module.exports = model('Post', PostSchema);

