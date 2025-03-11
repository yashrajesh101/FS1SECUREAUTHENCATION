const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserModel = require("../Models/User");

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await UserModel.findOne({ email }).lean();
        if (existingUser) {
            return res.status(409).json({
                message: 'User already exists. Please log in.',
                success: false
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user model
        const newUser = new UserModel({ name, email, password: hashedPassword });

        // Save user to database
        await newUser.save();

        res.status(201).json({
            message: "Signup successful",
            success: true
        });

    } catch (err) {
        console.error("Signup Error:", err);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        });
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await UserModel.findOne({ email });

        // Check if user exists
        if (!user) {
            return res.status(401).json({
                message: "Authentication failed: Incorrect email or password.",
                success: false
            });
        }

        // Verify password
        const isPassEqual = await bcrypt.compare(password, user.password);
        if (!isPassEqual) {
            return res.status(401).json({
                message: "Authentication failed: Incorrect email or password.",
                success: false
            });
        }

        // Generate JWT Token
        const jwtToken = jwt.sign(
            { email: user.email, _id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        // Set JWT as an HTTP-only cookie (recommended for security)
        res.cookie('token', jwtToken, {
            httpOnly: true, // Prevents XSS attacks
            secure: process.env.NODE_ENV === 'production', // Secure only in production
            sameSite: 'Strict', // Prevents CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // 24 hours
        });

        res.status(200).json({
            message: "Login successful",
            success: true,
            jwtToken,
            user: {
                email: user.email,
                name: user.name
            }
        });

    } catch (err) {
        console.error("Login Error:", err);
        res.status(500).json({
            message: "Internal server error. Please try again later.",
            success: false
        });
    }
};

module.exports = {
    signup,
    login
};
