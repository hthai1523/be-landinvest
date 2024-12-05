const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/user-routes');
const forumPostRoutes = require('./routes/forum-post-routes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Đăng ký các routes
app.use('/api/users', userRoutes);
app.use('/api/forum-posts', forumPostRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
