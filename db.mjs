import pg from 'pg';
const {Pool} = pg;

export const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'textdatabase',
    user: 'postgres',
    password: '**So1603'
});

export async function createDbTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS texts (
            id SERIAL PRIMARY KEY,
            text TEXT UNIQUE NOT NULL  
        )
    `);
    console.log("Table created successfully");
}

export async function insertVariables(textContent) {
    await pool.query('INSERT INTO texts (text) VALUES ($1)', [textContent]);
}

export async function selectText(textContent) {
    const result = await pool.query('SELECT text FROM texts WHERE text = $1', [textContent]);
    const value = result.rows[0];
    return value;
}