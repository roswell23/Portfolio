// ==============================================================================
// Message Controller
// Handles saving contact submissions and dispatching Brevo email alerts
// ==============================================================================
const prisma = require('../config/db');
const { sendContactNotification } = require('../services/emailService');

/**
 * @desc    Submit a contact form message
 * @route   POST /api/messages
 * @access  Public
 */
async function createMessage(req, res, next) {
  const { name, email, message } = req.body;

  try {
    // 1. Persist the message in PostgreSQL via Prisma
    const savedMessage = await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim()
      }
    });

    // 2. Dispatch email notification asynchronously (Non-blocking via Brevo HTTPS REST API)
    sendContactNotification({
      name: savedMessage.name,
      email: savedMessage.email,
      message: savedMessage.message
    }).catch(err => {
      console.error('Failed to send Brevo email notification:', err.message);
    });

    // 3. Return successful response to frontend
    return res.status(201).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully.',
      data: {
        id: savedMessage.id,
        name: savedMessage.name,
        created_at: savedMessage.createdAt
      }
    });
  } catch (error) {
    console.error('Error saving contact message in messageController:', error.message);
    next(error);
  }
}

module.exports = {
  createMessage
};
