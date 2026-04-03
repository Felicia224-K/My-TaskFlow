const { User} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




exports.register = async (req, res) => {
    try{
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ username, email, password: hashedPassword });

    res.status(201).json({ 
        message: 'User registered successfully', user: { id: user.id, username: user.username, email: user.email } 
    });
    } catch (err) {
        res.status(500).json({ 
            message: 'Server error', error: err.message 
        });
    }
};


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({
                 message: 'User not found' 
            });
        }

        const validate = await bcrypt.compare(password, user.password);

        if (!validate) {
            return res.status(401).json({ 
                message: 'Invalid password' 
            });
        }

        const token = jwt.sign( 
            {id: user.id},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}
        );

        res.json({ token });

    } catch (err) {
        res.status(500).json({  error: err.message });
    }
};


exports.me = async (req, res) => {
    try {
        console.log('req.user:', req.user); //trying something


        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['password'] }
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {

        console.error('me error:', err); // trying something
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.updateProfile = async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findByPk(req.user.id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        if (username) user.username = username;

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        await user.save();

        res.json({ message: 'Profile updated successfully', user: { id: user.id, username: user.username, email: user.email } });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};


exports.logout = (req, res) => {
    res.json({ message: 'Logged out successfully' });
};
