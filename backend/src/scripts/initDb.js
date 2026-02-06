import pool from '../config/db.js';

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

const initDb = async () => {
    try {
        await pool.query(createTableQuery);
        console.log("✅ Table 'candidates' created successfully (or already exists).");
    } catch (err) {
        console.error("❌ Error creating table:", err);
    } finally {
        pool.end();
    }
};

initDb();
