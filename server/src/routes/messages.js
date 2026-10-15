// ==============================================================================
// Messages Routes
// Mount path: /api/messages
// ==============================================================================
const express = require('express');
const router = express.Router();
const { contactLimiter } = require('../middleware/rateLimiter');
const { validateMessage } = require('../middleware/validators');
const { createMessage } = require('../controllers/messageController');

// POST /api/messages - Submit a contact message (rate-limited and validated)
router.post('/', contactLimiter, validateMessage, createMessage);

module.exports = router;
