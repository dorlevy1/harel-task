const statsService = require('../services/statsService');

async function overview(req, res, next) {
    try {
        const data = await statsService.getOverview();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

async function users(req, res, next) {
    try {
        const data = await statsService.getUserStats();
        res.json({ data });
    } catch (err) {
        next(err);
    }
}


module.exports = { overview, users };
