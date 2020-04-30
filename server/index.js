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
app.get('/api/post', blogCtrl.getAllPosts);
app.get('/api/post/:id', blogCtrl.getPost);

//Comment Endpoints
app.get('/api/comments', blogCtrl.getUserComments);

app.listen(SERVER_PORT, () => console.log(`Listening from ${SERVER_PORT} server be`));