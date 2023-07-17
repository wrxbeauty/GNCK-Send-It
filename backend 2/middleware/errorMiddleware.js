// Middleware to handle "Not Found" errors
const notFound = (req, res, next) => {
  // Create an error object with a descriptive message
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404); // Set the status code to 404 (Not Found)
  next(error); // Pass the error to the next middleware or error handler
};

// Error handler middleware
const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode); // Set the response status code based on the current response status code
  res.json({
    message: err.message, // Send the error message in the response JSON
    stack: process.env.NODE_ENV === "production" ? null : err.stack, // Send the error stack trace if not in production mode
  });
};

module.exports = { notFound, errorHandler };
