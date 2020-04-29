SELECT c.comment_id, c.comment, p.title FROM comments c
JOIN users u ON u.user_id = c.user_id
JOIN posts p ON p.post_id = c.post_id
WHERE u.user_id = $1;