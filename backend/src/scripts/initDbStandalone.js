import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env
dotenv.config({ path: join(__dirname, '../../src/.env') });

const createTableQuery = `
CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER CHECK (age >= 18),
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(50),
    skills TEXT,
    experience TEXT,
    applied_position VARCHAR(255),
    status VARCHAR(50) DEFAULT 'Applied' CHECK (status IN ('Applied', 'Interviewing', 'Hired', 'Rejected')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
`;

const run = async () => {
    // Clean connection string like in db.js
    const connectionString = process.env.DATABASE_URL?.replace(/\?sslmode=.*$/, '');
    
    console.log("Connecting to:", connectionString?.replace(/:.*@/, ':****@')); // Log masked URL

    const pool = new Pool({
        connectionString,
        ssl: { rejectUnauthorized: false }
    });

    try {
        await pool.query(createTableQuery);
        console.log("✅ Table 'candidates' created successfully.");
    } catch (err) {
        console.error("❌ Error creating table:", err);
    } finally {
        await pool.end();
    }
};

run();
