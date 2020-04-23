INSERT INTO users(
    username,
    email,
    password,
    admin,
    profile_pic
)
VALUES ($1, $2, $3, $4, $5)
returning username, email, admin, profile_pic;