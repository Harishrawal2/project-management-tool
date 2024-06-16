import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { createToken } from '../utils/tokenHelper.js';

// Function to validate password complexity
function isValidPassword(password) {
    // Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
}

export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        let user = await User.findOne({ email })

        // Validate password complexity
        if (!isValidPassword(password)) {
            return res.status(400).json({ error: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.' });
        }

        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
        });

        await user.save();
        res.status(201).json({
            msg: "User saved successfully", user: {
                name: user.name,
                email: user.email,
                role: user.role,
                _id: user._id,
            }
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        // Assume user is already authenticated and we have user details
        const token = createToken();
        // Set the token as a cookie 
        // Expires in 1 hour
        res.cookie("token", token, { httpOnly: true, maxAge: 3600000 });

        // return success response
        res.status(200).json({ message: "Login successful", token, user });

    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: err.message });

    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        // Find user by ID and exclude the password field
        const user = await User.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ msg: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};