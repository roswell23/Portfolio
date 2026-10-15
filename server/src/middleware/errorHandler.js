// ==============================================================================
// Error Handling Middleware
// Standardizes 404 responses and catches unhandled application exceptions
// ==============================================================================

/**
 * Handle 404 for undefined routes
 */
function notFoundHandler(req, res, next) {
  res.status(404).json({
    success: false,
    message: `Resource not found at ${req.originalUrl}`
  });
}

/**
 * Global Express Error Handling Middleware
 */
function errorHandler(err, req, res, next) {
  console.error('Unhandled server error:', err.stack || err.message);

  const statusCode = res.statusCode !== 200 && res.statusCode !== 201 ? res.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

module.exports = {
  notFoundHandler,
  errorHandler
};
