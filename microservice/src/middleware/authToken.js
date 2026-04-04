/**
 * Internal Token Authentication Middleware
 *
 * Validates the X-Internal-Token header against the configured secret.
 * Restricts access to internal service-to-service endpoints only.
 */

const HEADER_NAME = 'x-internal-token';

function authToken(req, res, next) {
    if (!process.env.INTERNAL_TOKEN) {
        console.error('[Auth] INTERNAL_TOKEN is not configured');
        return res.status(500).json({ error: 'Service misconfigured' });
    }

    const token = req.headers[HEADER_NAME];

    if (!token) {
        return res.status(401).json({ error: 'Missing authentication token' });
    }

    if (token !== process.env.INTERNAL_TOKEN) {
        return res.status(403).json({ error: 'Invalid authentication token' });
    }

    next();
}

module.exports = authToken;
