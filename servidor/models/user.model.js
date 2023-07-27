const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
  } catch (error) {
    return next(error);
    
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    console.log('Comparing Passwords');
    console.log('Input Password:', password);
    console.log('Stored Password:', this.password);
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = mongoose.model('User', userSchema);
