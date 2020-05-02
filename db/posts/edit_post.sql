UPDATE posts
SET title = $1,
    image = $2,
    content = $3,
    rating = $4
WHERE post_id = $5;