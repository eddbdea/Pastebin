import pg from 'pg';
import dotenv from 'dotenv';
dotenv.config();

const {Pool} = pg;

export const pool = new Pool ({
    host: process.env.PG_HOST,
    port: parseInt(process.env.PG_PORT),
    database: process.env.PG_DATABASE,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
});

//create database table
export async function createDbTable() {
    await pool.query(`
        CREATE TABLE IF NOT EXISTS text_records (
            id SERIAL PRIMARY KEY,
            body TEXT NOT NULL  
        )
    `);
}

//insert variables inside the table
export async function insertVariables(textContent) {
    await pool.query('INSERT INTO text_records (body) VALUES ($1)', [textContent]);
}

//select table content
export async function selectText() {
    const result = await pool.query('SELECT * FROM text_records');
    return result.rows;
}

//select clicked text (client-side) from db
export async function findText(textId) {
    const result = await pool.query('SELECT body FROM text_records WHERE id = $1', [textId]);
    return result.rows[0].body;
}