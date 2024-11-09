import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/db_utils.js';
import dotenv from 'dotenv';

dotenv.config();

const authRouter = express.Router();
const saltRounds = 10;

const generateToken = (username) => {
    return jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Auth Page Route
authRouter.get('/', function(req, res, next) {
	res.render('auth');
})

// Registration Route
authRouter.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if the user already exists
        const [userCheck] = await pool.query(
            "SELECT * FROM User WHERE username = ?",
            [username]
        );

        if (userCheck.length !== 0) {
            return res.status(400).json({ message: "User  already exists" });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Insert the new user into the database
        const newUser  = await pool.query(
            "INSERT INTO User (username, password) VALUES (?, ?)",
            [username, hashedPassword]
        );

        // Generate a token
        const token = generateToken(username);

        // Store the token in a cookie (if you prefer using cookies for auth)
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry

        // Redirect to the products page upon successful login
        res.redirect('/products');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


// Login Route
authRouter.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find the user in the database
        const [user] = await pool.query(
            "SELECT * FROM User WHERE username = ?",
            [username]
        );

        if (user.length === 0) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        const hashedPassword = user[0].password;

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, hashedPassword);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid username or password" });
        }

        // Generate a token
        const token = generateToken(username);

        // Store the token in a cookie (if you prefer using cookies for auth)
        res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiry
        
        // Redirect to the products page upon successful login
        res.redirect('/products');
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
});


export const authMiddleware = (req, res, next) => {
    // Get token from the request headers
    const token = req.cookies.token;

    if (!token) {
        // No token provided, redirect to login/register page
        return res.redirect('/auth');
    }

    // Verify the token
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            // Token is not valid, redirect to login/register page
            return res.redirect('/auth');
        }

        // Token is valid, save the decoded information to the request object
        req.user = decoded;
        next();
    });
};


// Logout Route
authRouter.post('/logout', (req, res) => {
    // Clear the token cookie to log the user out
    res.clearCookie('token');
    res.redirect('/auth');
});

export default authRouter;
