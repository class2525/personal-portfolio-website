const express = require('express');
const router = express.Router();

const {
  getProjects
} = require('../controllers/projectController');

const {
  getSkills
} = require('../controllers/skillController');

const {
  getProfile
} = require('../controllers/profileController');

const {
  submitContact
} = require('../controllers/contactController');

// Projects
router.get('/projects', getProjects);

// Skills
router.get('/skills', getSkills);

// Profile
router.get('/profile', getProfile);

// Contact Form
router.post('/contact', submitContact);

module.exports = router;
