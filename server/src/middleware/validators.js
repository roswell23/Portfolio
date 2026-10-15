// ==============================================================================
// Input Validation Middleware
// Validates request payload structures before reaching controllers
// ==============================================================================

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validates the body for POST /api/messages
 */
function validateMessage(req, res, next) {
  const { name, email, message } = req.body;
  const errors = {};

  if (!name || typeof name !== 'string' || !name.trim()) {
    errors.name = 'Please provide your name.';
  } else if (name.trim().length > 100) {
    errors.name = 'Name must be 100 characters or fewer.';
  }

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.email = 'Please provide your email address.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Please provide a valid email address.';
  }

  if (!message || typeof message !== 'string' || !message.trim()) {
    errors.message = 'Please provide a message.';
  } else if (message.trim().length < 5) {
    errors.message = 'Message must be at least 5 characters long.';
  } else if (message.trim().length > 2000) {
    errors.message = 'Message must be 2000 characters or fewer.';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed. Please correct the fields.',
      errors
    });
  }

  next();
}

module.exports = {
  validateMessage,
  EMAIL_REGEX
};
