import pool from '../config/db.js';

// GET: Fetch all candidates
// GET: Fetch all candidates
export const getAllCandidates = async (req, res, next) => {
    try {
        // Simulating a database failure or unexpected error
        const result = await pool.query('SELECT * FROM candidates ORDER BY created_at DESC');
        res.status(200).json(result.rows);
    } catch (err) {
        // Instead of res.status(500), we pass it to the global error handler
        next(err); 
    }
};

// POST: Insert a new candidate with validation
export const createCandidate = async (req, res) => {
    const { name, age, email, phone, skills, experience, applied_position, status } = req.body;

    // Basic Validation for Required Fields
    if (!name || !age || !email) {
        return res.status(400).json({ message: "Name, Age, and Email are required fields." });
    }

    try {
        const query = `
            INSERT INTO candidates (name, age, email, phone, skills, experience, applied_position, status) 
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8) 
            RETURNING *`;
        
        const values = [name, age, email, phone, skills, experience, applied_position, status || 'Applied'];
        
        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]); // 201 = Created
    } catch (err) {
        // Handle Unique Email Constraint Error
        if (err.code === '23505') {
            return res.status(400).json({ message: "Email already exists." });
        }
        res.status(500).json({ message: "Database Error", error: err.message });
    }
};

// GET: Fetch a single candidate by ID
export const getCandidateById = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('SELECT * FROM candidates WHERE id = $1', [id]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Candidate not found" });
        }
        
        res.status(200).json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// PUT: Update an existing candidate record
export const updateCandidate = async (req, res) => {
    const { id } = req.params;
    const { name, age, email, phone, skills, experience, applied_position, status } = req.body;

    try {
        const query = `
            UPDATE candidates 
            SET name = $1, age = $2, email = $3, phone = $4, skills = $5, 
                experience = $6, applied_position = $7, status = $8
            WHERE id = $9 RETURNING *`;
        
        const values = [name, age, email, phone, skills, experience, applied_position, status, id];
        const result = await pool.query(query, values);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json(result.rows[0]);
    } catch (err) {
        if (err.code === '23505') {
            return res.status(400).json({ message: "Email already exists" });
        }
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};

// DELETE: Remove a candidate record
export const deleteCandidate = async (req, res) => {
    const { id } = req.params;
    try {
        const result = await pool.query('DELETE FROM candidates WHERE id = $1 RETURNING *', [id]);

        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Candidate not found" });
        }

        res.status(200).json({ message: "Candidate deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Server Error", error: err.message });
    }
};