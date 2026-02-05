import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Explicitly load .env from src/ directory
dotenv.config({ path: join(__dirname, '../.env') });

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Test Connection Log
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('PostgreSQL Connected at:', res.rows[0].now);
  }
});

export default pool;