import pg from 'pg';
const {Pool} = pg;

const pool = new Pool ({
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
            text TEXT NOT NULL  
        )
    `);
    console.log("Table created successfully");
}

export async function insertVariables() {
    await pool.query("INSERT INTO texts (text) VALUES ('Paul')");
}

insertVariables();