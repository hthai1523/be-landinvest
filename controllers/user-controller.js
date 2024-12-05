const userModel = require('../models/user-model');

// Lấy tất cả người dùng
const getUsers = (req, res) => {
    userModel.getAllUsers((err, users) => {
        if (err) {
            return res.status(500).json({ error: 'Something went wrong' });
        }
        res.json(users);
    });
};

module.exports = { getUsers };
