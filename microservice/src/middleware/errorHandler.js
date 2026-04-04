/**
 * Global Error Handler Middleware
 *
 * Catches unhandled errors and returns a consistent JSON response.
 * Logs the full error in development, hides details in production.
 */

function errorHandler(err, req, res, _next) {
    const status = err.status || 500;

    console.error(`[Error] ${req.method} ${req.originalUrl} - ${err.message}`);

    res.status(status).json({
        error: status === 500 ? 'Internal server error' : err.message
    });
}

module.exports = errorHandler;
