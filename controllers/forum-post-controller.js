const forumPostModel = require("../models/forum-model");

const createPost = (req, res) => {
    const { userID, groupID, title, content, ipPosted, postLatitude, postLongitude } = req.body;

    if (!userID || !groupID || !title || !content || !ipPosted) {
        return res.status(400).json({ error: "Missing required fields" });
    }

    forumPostModel.createPost(
        { userID, groupID, title, content, ipPosted, postLatitude, postLongitude },
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: "Error creating post" });
            }
            res.status(201).json({ message: "Post created successfully", post: result });
        }
    );
};

const viewAllPost = (req, res) => {
    forumPostModel.viewAllPost((err, result) => {
        if(err) {
            return res.status(500).json({error: "Error View ALl Post"})
        }
        res.status(200).json({message: "View All Success", posts: result})
    })
}

module.exports = { createPost, viewAllPost };
