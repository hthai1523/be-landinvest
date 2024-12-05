const pool = require("../config/database");

const createPost = (
  { userID, groupID, title, content, ipPosted, postLatitude, postLongitude },
  callback
) => {
  const query =
    "INSERT INTO ForumPosts (UserID, GroupID, Title, Content, IPPosted, PostLatitude, PostLongitude) VALUES (?,?,?,?,?,?,?)";

  pool.query(
    query,
    [userID, groupID, title, content, ipPosted, postLatitude, postLongitude],
    (err, result) => {
      if (err) return callback(err);
      const selectQuery = "SELECT * FROM ForumPosts WHERE PostID = ?";
      pool.query(selectQuery, [result.insertId], (err, rows) => {
        if (err) return callback(err);
        callback(null, rows[0]);
      });
    }
  );
};

const viewAllPost = (pageNumber, pageSize, callback) => {
  const countQuery = "SELECT COUNT(*) as total FROM ForumPosts"
  const dataQuery = `
  SELECT 
      PostID, UserID, GroupID, Images ,Title, Content, PostTime, IPPosted, PostLatitude, PostLongitude, timeView 
  FROM ForumPosts 
  ORDER BY PostTime DESC 
  LIMIT ? OFFSET ?`;

  const offset = (pageNumber - 1) * pageSize;

  pool.query(countQuery, (countErr, countResult) => {
    if (countErr) {
      return callback(countErr)
    }

    const totalItems = countResult[0].total; // Tổng số bài viết
    const numberPage = Math.ceil(totalItems / pageSize); // tổng Số trang

    pool.query(dataQuery, [pageSize, offset], (dataErr, dataResult) => {
      if (dataErr) return callback(dataErr)

      callback(null, {
        data: dataResult,
        message: "View All Success",
        numberItem: totalItems,
        numberPage,
        status: 200
      })
    })
  })
}

module.exports = { createPost, viewAllPost };
