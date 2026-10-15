// ==============================================================================
// Standard API Response Utilities
// ==============================================================================

/**
 * Standard Success Response helper
 */
function successResponse(res, data = {}, message = 'Success', statusCode = 200) {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
}

/**
 * Standard Error Response helper
 */
function errorResponse(res, message = 'An error occurred', statusCode = 500, errors = null) {
  return res.status(statusCode).json({
    success: false,
    message,
    ...(errors && { errors })
  });
}

module.exports = {
  successResponse,
  errorResponse
};
