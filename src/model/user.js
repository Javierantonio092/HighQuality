const {Schema, model} = require('mongoose');
const bcrypt = require ("bcrypt");

const userSchema = new Schema(
    {
      email: {
        type: String,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      timestamps: true,
      versionKey: false,
    }
);

userSchema.statics.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  };
  
  userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  module.exports = model('User', userSchema);
