import pg from 'pg';
const {Pool} = pg;

export const pool = new Pool ({
    host: 'localhost',
    port: 5432,
    database: 'textdatabase',
    user: 'postgres',
    password: '**So1603'
});

//create database table
export async function createDbTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS texts (
            id SERIAL PRIMARY KEY,
            text TEXT NOT NULL  
        )
    `);
    //console.log("Table created successfully");
}

//insert variables inside the table
export async function insertVariables(textContent) {
    await pool.query('INSERT INTO texts (text) VALUES ($1)', [textContent]);
}

//select table content
export async function selectText() {
    const result = await pool.query('SELECT * FROM texts');
    //console.log(result.rows);
    return result.rows;
}

//select clicked text (client-side) from db
export async function findText(textId) {
    const result = await pool.query('SELECT text FROM texts WHERE id = $1', [textId]);
    //console.log(value);
    return result.rows[0].text;
}