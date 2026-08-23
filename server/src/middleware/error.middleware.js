/**
 * Catch 404 errors for undefined routes.
 */
export const notFoundHandler = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Resource not found - ${req.originalUrl}`
  });
};

/**
 * Global error handler middleware.
 * Ensures clean JSON output and suppresses internal stack traces in non-development environments.
 */
export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const isDev = process.env.NODE_ENV === 'development';

  console.error(`[Error Middleware] ${err.message}`, isDev ? err.stack : '');

  res.status(statusCode).json({
    success: false,
    message: statusCode === 500 ? 'Internal server error.' : err.message,
    ...(isDev && { stack: err.stack })
  });
};
