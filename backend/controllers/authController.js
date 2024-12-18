const pool = require('../db'); // PostgreSQL connection
const bcrypt = require('bcrypt');

// Handle User Signup
const signupUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Hash the password before storing
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into "User_Data"
        const result = await pool.query(
            `INSERT INTO "User_Data" (email, password) VALUES ($1, $2) RETURNING id, email`,
            [email, hashedPassword]
        );

        res.status(201).json({ user: result.rows[0] });
    } catch (error) {
        console.error('Signup Error:', error.message);
        res.status(500).json({ error: 'Failed to sign up. User may already exist.' });
    }
};

// Handle User Login
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        // Fetch user from "User_Data"
        const result = await pool.query(
            `SELECT * FROM "User_Data" WHERE email = $1`,
            [email]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        const user = result.rows[0];

        // Compare hashed passwords
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ error: 'Invalid email or password.' });
        }

        res.status(200).json({ user: { id: user.id, email: user.email } });
    } catch (error) {
        console.error('Login Error:', error.message);
        res.status(500).json({ error: 'Failed to log in.' });
    }
};

module.exports = { signupUser, loginUser };
