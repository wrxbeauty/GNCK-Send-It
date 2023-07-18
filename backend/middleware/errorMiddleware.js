// Middleware function for handling 404 errors (Not Found)
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set response status code to 404 (Not Found)
  next(error); // Pass the error object to the next middleware/error handler
};

// Middleware function for handling general errors
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Set the response status code to the determined status code
  res.json({
    message: err.message, // Include the error message in the response
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
    // Include the error stack trace in development mode (security measure in production)
  });
};

// Export the middleware functions
module.exports = { notFound, errorHandler };
