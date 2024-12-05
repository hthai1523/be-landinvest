const forumPostModel = require("../models/forum-model")

const createPost = (req, res) => {
    const { userID, groupID, title, content, ipPosted, postLatitude, postLongitude } = req.body;

    if(!userID || !groupID || !title || !content || !ipPosted) {
        return res.status(400).json('Missing required fields');
    }

    forumPostModel.createPost({ userID, groupID, title, content, ipPosted, postLatitude, postLongitude }, (err, post) => {
        if(err) return res.status(500).json('Error creating post');
        res.status(201).json({ message: 'Post created successfully', post });
    });
}

module.exports = {createPost}