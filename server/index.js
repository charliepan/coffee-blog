require('dotenv').config();

const express = require('express'),
      authCtrl = require('./controllers/authController'),
      blogCtrl = require('./controllers/blogController'),
      session = require('express-session'),
      app = express(),
      massive = require('massive'),
      {SERVER_PORT, CONNECTION_STRING, SESSION_SECRET} = process.env;

app.use(express.json());
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    cookie: {maxAge: 1000 * 60 * 60 * 24}
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db =>{
    app.set('db',db);
    console.log('db connected');
});

//Auth Endpoints
app.post('/auth/register', authCtrl.register);
app.post('/auth/login', authCtrl.login);
app.get('/auth/logout', authCtrl.logout);

//Post Endpoints
app.post('/api/post', blogCtrl.createPost);
app.get('/api/posts', blogCtrl.getAllPosts);
app.get('/api/posts/:id', blogCtrl.getPost);
app.put('/api/posts/:id', blogCtrl.editPost);
app.delete('/api/posts/:id', blogCtrl.deletePost);

//Contact Endpoints
app.post('/contact/blog', blogCtrl.contactEmail);
app.post('/contact/response', blogCtrl.responseEmail);


//Comment Endpoints
app.post('/api/comments', blogCtrl.createComment);
app.get('/api/post/comments/:id', blogCtrl.getPostComments);
app.put('/api/comments/:id', blogCtrl.editUserComment);
app.get('/api/comments/:id', blogCtrl.getUserComments);
app.delete('/api/comments/:id', blogCtrl.deleteUserComment);

app.listen(SERVER_PORT, () => console.log(`Listening from ${SERVER_PORT} server be`));