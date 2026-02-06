import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from src directory (one level up from config)
dotenv.config({ path: join(__dirname, '../.env') });

const pool = new Pool({
  connectionString: process.env.DATABASE_URL?.replace(/\?sslmode=.*$/, ''), // Strip sslmode params to fix warnings
  ssl: {
    rejectUnauthorized: false // Required for Neon and many cloud providers
  }
});

// Test Connection
pool.connect((err, client, release) => {
  if (err) {
    return console.error('Neon Connection Error:', err.stack);
  }
  console.log('Connected to Neon Cloud PostgreSQL');
  release();
});

export default pool;