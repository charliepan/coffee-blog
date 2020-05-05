const nodemailer = require('nodemailer'),
      {EMAIL,PASSWORD} = process.env;

module.exports = {
    createPost: (req,res) =>{
        const {user_id,title, image, content, date_added, rating, likes} = req.body,
              db = req.app.get('db');

        db.posts.create_post(user_id,title, image, content, date_added, rating, likes)
          .then(()=> res.sendStatus(200))
          .catch(err => res.status(500).send(err));
    },
    getAllPosts: (req,res) =>{
        const db = req.app.get('db');
        db.posts.get_all_posts()
          .then(posts=> res.status(200).send(posts))
          .catch(err=> res.status(500).send(err));        
    },
    editPost: (req,res) =>{
        const {title, image, content, rating} = req.body,
              {id} = req.params,
              db = req.app.get('db');
        // console.log(req.body);
        // console.log(title, image, content, rating, id);
        db.posts.edit_post(title, image, content, rating, id)
          .then(()=> res.sendStatus(200))
          .catch(err=> res.status(500).send(err));  
    },
    deletePost: (req,res) =>{
        const {id} = req.params,
              db = req.app.get('db');
        
              console.log(id);
              
        db.posts.delete_post(id)
          .then(() => res.sendStatus(200))
          .catch(err => res.status(500).send(err));
    },
    getPost: (req,res) =>{
        const {id} = req.params,
              db = req.app.get('db');
        db.posts.get_post(id)
          .then(post=> res.status(200).send(post))
          .catch(err=> res.status(500).send(err));        
    },
    createComment: (req,res) =>{
        const {user_id, post_id, comment} = req.body,
        db = req.app.get('db');

        db.comments.create_comment(user_id, post_id, comment)
            .then(()=> res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    getUserComments: (req, res)=>{
        const {id} = req.params,
              db = req.app.get('db');
        db.comments.get_user_comments(id)
          .then(comments => res.status(200).send(comments))
          .catch(err => console.log(err));
    },
    getPostComments: (req, res)=>{
        const {id} = req.params,
              db = req.app.get('db');
        db.posts.get_post_comments(id)
          .then(comments => res.status(200).send(comments))
          .catch(err => console.log(err));
    },
    editUserComment: (req,res)=>{
        const {id} = req.params,
        {comment} = req.body,
        db = req.app.get('db');

        db.comments.edit_user_comment(id, comment)
            .then(()=> res.sendStatus(200))
            .catch(err=> res.status(500).send(err));  
    },
    deleteUserComment: (req,res)=>{
        const {id} = req.params,
        db = req.app.get('db');
  
        console.log(id);
        
        db.comments.delete_user_comment(id)
            .then(() => res.sendStatus(200))
            .catch(err => res.status(500).send(err));
    },
    contactEmail : (req, res) =>{
        const { name, email, subject, question} = req.body
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service: 'yahoo',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });
        transporter.sendMail({
            from: `Beanafide <${EMAIL}>`,
            to: `Beanafide <${EMAIL}>`,
            subject: `You have an email from ${name} <${email}> regarding "${subject}"`,
            text: question
        },(err,success) =>{
            if(err){
                console.log(err);
                res.status(500).send(`An error has occured: ${err}`);
            }
            else{
                console.log(success)
                res.status(200).send('Success');
            }
        })
    },
    responseEmail : (req, res) =>{
        const { name, email, subject} = req.body
        let transporter = nodemailer.createTransport({
            host: 'smtp.mail.yahoo.com',
            port: 465,
            service: 'yahoo',
            secure: false,
            auth: {
                user: EMAIL,
                pass: PASSWORD
            }
        });
        transporter.sendMail({
            from: `Beanafide <${EMAIL}>`,
            to: `${name} <${email}>`,
            subject: `We have received your email regarding "${subject}"`,
            text: "We ask that you please allow up to 1-2 days for the blog staff to get back to you. We're trying our best to respond on a timely manner. Thank you!"
        },(err,success) =>{
            if(err){
                console.log(err);
                res.status(500).send(`An error has occured: ${err}`);
            }
            else{
                console.log(success)
                res.status(200).send('Success');
            }
        })
    }
}