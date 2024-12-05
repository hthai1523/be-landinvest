const pool = require('../config/database');

const getAllUsers = (callback) => {
    const query = 'SELECT * FROM Users';
    pool.query(query, (err, results) => {
        if (err) return callback(err);
        callback(null, results);
    });
};

module.exports = { getAllUsers };
