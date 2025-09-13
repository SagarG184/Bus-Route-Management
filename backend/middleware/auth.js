const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        const token = req.header('Authorization')?.replace('Bearer ', '');
        
        if (!token) {
            throw new Error('No authentication token provided');
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findOne({ _id: decoded.userId });

        if (!user) {
            throw new Error('User not found');
        }

        // Add user to request object
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Please authenticate' });
    }
};

// Middleware to check if email domain is nie.ac.in
const validateNIEEmail = (req, res, next) => {
    const email = req.body.email.toLowerCase();
    if (!email.endsWith('@nie.ac.in')) {
        return res.status(403).json({ 
            message: 'Access restricted to NIE email addresses only (@nie.ac.in)'
        });
    }
    next();
};

module.exports = {
    auth,
    validateNIEEmail
};
