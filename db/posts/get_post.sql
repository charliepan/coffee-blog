SELECT p.post_id,
    p.title,
    p.image,
    p.content,
    p.date_added,
    p.rating,
    p.likes,
    u.username,
    u.profile_pic FROM posts p
JOIN users u on u.user_id = p.user_id
WHERE p.post_id = $1;