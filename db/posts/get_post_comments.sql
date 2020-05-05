SELECT c.comment_id, c.comment, u.user_id FROM comments c
JOIN posts p on p.post_id = c.post_id
JOIN users u ON u.user_id = c.user_id
WHERE p.post_id = $1;