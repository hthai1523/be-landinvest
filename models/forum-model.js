const pool = require("../config/database");

const createPost = (
  userID,
  groupID,
  title,
  content,
  ipPosted,
  postLatitude,
  postLongitude,
  callback
) => {
  const query =
    "INSERT INTO ForumPosts (UserID, GroupID, Title, Content, IPPosted, PostLatitude, PostLongitude) VALUES (?,?,?,?,?,?,?)";

  if (!userID || !groupID || title || !content || !ipPosted) {
    return res;
  }

  pool.query(
    query,
    [userID, groupID, title, content, ipPosted, postLatitude, postLongitude],
    (err, result) => {
        console.log("easjncajs")
    //   if (err) callback(err);
    //   callback(null, result);
    }
  );
};

module.exports = { createPost };
