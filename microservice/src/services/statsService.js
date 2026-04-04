const { query } = require('../database');

async function getOverview() {
    const [totalResult, statusResult, priorityResult, recentResult] = await Promise.all([
        query('SELECT COUNT(*) AS total FROM tickets'),
        query('SELECT status, COUNT(*) AS count FROM tickets GROUP BY status'),
        query('SELECT priority, COUNT(*) AS count FROM tickets GROUP BY priority'),
        query("SELECT COUNT(*) AS count FROM tickets WHERE created_at >= DATEADD(DAY, -7, GETDATE())"),
    ]);

    const byStatus = {};
    statusResult.recordset.forEach(row => { byStatus[row.status] = row.count; });

    const byPriority = {};
    priorityResult.recordset.forEach(row => { byPriority[row.priority] = row.count; });

    return {
        total: totalResult.recordset[0].total,
        by_status: byStatus,
        by_priority: byPriority,
        created_last_7_days: recentResult.recordset[0].count,
    };
}

async function getUserStats() {
    const result = await query(`
        SELECT
            u.id, u.name, u.email, COUNT(t.id) AS assigned_count,
            SUM(CASE WHEN t.status = 'closed' THEN 1 ELSE 0 END) AS closed_count,
            SUM(CASE WHEN t.status = 'open' THEN 1 ELSE 0 END) AS open_count,
            SUM(CASE WHEN t.status = 'in_progress' THEN 1 ELSE 0 END) AS in_progress_count
        FROM users u
        LEFT JOIN tickets t ON t.assigned_user_id = u.id
        GROUP BY u.id, u.name, u.email
        ORDER BY assigned_count DESC
    `);

    return result.recordset.map(user => ({
        ...user
    }));
}

module.exports = { getOverview, getUserStats };
