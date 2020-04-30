INSERT INTO posts(
    user_id,
    title,
    image,
    content,
    date_added,
    rating,
    likes
)
VALUES ($1,$2,$3,$4,$5,$6,$7);