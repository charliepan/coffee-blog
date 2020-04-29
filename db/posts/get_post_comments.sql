SELECT c.comment_id, c.comment FROM comments c
JOIN posts p on p.post_id = c.post_id
WHERE p.post_id = $1;