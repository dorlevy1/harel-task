const statsService = require('../services/statsService');

const overview = async (req, res, next) => {
    try {
        const data = await statsService.getOverview();
        res.json(data);
    } catch (err) {
        next(err);
    }
}

const users = async (req, res, next) => {
    try {
        const data = await statsService.getUserStats();
        res.json({ data });
    } catch (err) {
        next(err);
    }
}


module.exports = { overview, users };
