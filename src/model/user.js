const mongoose = require('mongoose ');
const {Schema} = mongoose;

const UserSchema = new Schema({
 username:{type: String},
 email:{type: String},
 password:{type: String},
 gravatar:{type: String},
 role:{type: String}
})


