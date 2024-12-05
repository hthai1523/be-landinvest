const express = require('express');
const router = express.Router();
const forumPostController = require('../controllers/forum-post-controller');

// Route tạo bài viết mới
router.post('/', forumPostController.createPost);

module.exports = router;