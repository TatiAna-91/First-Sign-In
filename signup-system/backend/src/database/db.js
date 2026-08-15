import pg from "pg";
import 'dotenv/config';

const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

export default pool;

// Test the database connection
/*
pool.query("SELECT NOW()", (err, res) => {
    if (err) {
        console.error("Error connecting to the database:", err);
    }
    else {
        console.log("Database connection successful:", res.rows);
    }
});
*/
