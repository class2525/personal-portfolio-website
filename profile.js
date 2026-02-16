const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: String,
  bio: String,
  avatar: String,
  email: String,
  phone: String,
  social: {
    github: String,
    linkedin: String,
    twitter: String
  }
});

module.exports = mongoose.model('Profile', ProfileSchema);
