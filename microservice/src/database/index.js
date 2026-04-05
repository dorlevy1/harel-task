const sql = require('mssql/msnodesqlv8');

const server = process.env.DB_HOST || '.';
const database = process.env.DB_NAME || 'ticket_system';
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const config = {
    connectionString: `Driver={SQL Server};server=${server};Database=${database};UID=${user};PWD=${password};`,
    pool: {
        min: 2,
        max: 10,
        idleTimeoutMillis: 30000,
    },
};

let pool = null;
let connecting = null;

const getPool = async () => {
    if (pool) return pool;
    if (!connecting) {
        connecting = sql.connect(config).then((p) => {
            pool = p;
            connecting = null;
            console.log(`[DB] Connected to ${server} - ${database}`);
            return pool;
        });
    }
    return connecting;
}

const query = async (queryString, inputs = []) => {
    const pool = await getPool();
    const req = pool.request();
    inputs.forEach(({ name, type, value }) => req.input(name, type, value));
    return req.query(queryString);
}

const close = async () => {
    if (pool) {
        await pool.close();
        pool = null;
        console.log('[DB] Connection closed');
    }
}

module.exports = { getPool, query, close, sql };
