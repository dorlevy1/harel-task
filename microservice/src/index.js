const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') });

const express = require('express');
const authToken = require('./middleware/authToken');
const errorHandler = require('./middleware/errorHandler');
const statsRoutes = require('./routes/stats');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'ticket-stats', uptime: process.uptime() });
});

app.use('/stats', authToken, statsRoutes);

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, '127.0.0.1', () => {
    console.log(`[Server] Stats service running on http://127.0.0.1:${PORT}`);
});
