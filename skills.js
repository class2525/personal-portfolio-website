const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: String,
  proficiency: Number, // 1-100
  icon: String
});

module.exports = mongoose.model('Skill', SkillSchema);
