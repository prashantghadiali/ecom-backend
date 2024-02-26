const Users = require('../models/user');
const jwt = require('jsonwebtoken');

// Signup 
exports.signup = async (req, res) => {
    try {
        const { email, password } = req.body;
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: 'Email already exists' });
        }

        const newUser = await Users.create({ email, password });
        const token = jwt.sign({ userId: newUser._id }, 'your_secret_key', { expiresIn: '1h' });
        
        res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour expiration
        res.status(201).json({ user: newUser._id, token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login 
exports.login = async (req, res) => {
    try {
        // User is already authenticated through requireAuth middleware
        const user = req.user;
        res.status(200).json({ user: user._id });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
