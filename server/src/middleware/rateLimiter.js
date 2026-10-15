// ==============================================================================
// Rate Limiter Middleware
// Protects endpoints against DDoS, brute-force, and form spam
// ==============================================================================
const rateLimit = require('express-rate-limit');

// Global Limiter: 200 requests per 15 minutes per IP address
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many requests from this IP address, please try again after 15 minutes.'
  }
});

// Contact Limiter: Maximum 5 submissions per 15 minutes per IP address
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: 'Too many messages sent from this IP address. Please try again after 15 minutes.'
  }
});

module.exports = {
  globalLimiter,
  contactLimiter
};
