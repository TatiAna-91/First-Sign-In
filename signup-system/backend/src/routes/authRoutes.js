import express from 'express';
import pool from '../database/db.js';

const router = express.Router();

router.post("/signup" , async (req,res) =>{
    const {username ,email ,password } =req.body;

    // Basic validation
    if (!username || !email || !password) {
        return res.status(400).json({ message: "All fields (username, email, password) are required." });
    }

    try {
        // 1. Check if user already exists
        const userExists = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
        if (userExists.rows.length > 0) {
            return res.status(400).json({ message: "User with this email already exists." });
        }

        // 2. Insert new user into database
        // Note: Password is NOT hashed yet! That will be the next step.
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING id, username, email, created_at",
            [username, email, password]
        );

        // 3. Return success response
        res.status(201).json({
            message:"Signup successful",
            user: newUser.rows[0]
        });
    } catch (error) {
        console.error("Error in signup:", error);
        res.status(500).json({ message: "Internal server error." });
    }
 });

 export default router;