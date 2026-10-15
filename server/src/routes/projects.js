// ==============================================================================
// Projects Routes
// Mount path: /api/projects
// ==============================================================================
const express = require('express');
const router = express.Router();
const { getProjects } = require('../controllers/projectController');

// GET /api/projects - Fetch all projects
router.get('/', getProjects);

module.exports = router;
