CREATE TABLE IF NOT EXISTS users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(30),
    email VARCHAR(200),
    password VARCHAR(250),
    admin BOOLEAN,
    profile_pic TEXT
);

CREATE TABLE IF NOT EXISTS posts (
    post_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    title VARCHAR(255),
    image TEXT,
    content VARCHAR(3000),
    date_added TEXT,
    rating INT,
    likes INT
);

CREATE TABLE IF NOT EXISTS comments (
    comment_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id),
    comment VARCHAR(500),
    date_added TEXT,
    likes INT
);

CREATE TABLE IF NOT EXISTS likes(
    likes_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id),
    post_id INT REFERENCES posts(post_id),
    comment_id INT REFERENCES comments(comment_id),
    liked INT
);