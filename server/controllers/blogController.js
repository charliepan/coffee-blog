const nodemailer = require('nodemailer'),
      {EMAIL,PASSWORD} = process.env;

module.exports = {
    createPost: (req,res) =>{
        const {id, title, image, content} = req.body,
              db = req.app.get('db');

        db.posts.create_post(id,title,image,content)
          .then(()=> res.sendStatus(200))
          .catch(err => res.status(500).send(err));
    },
    getAllPosts: (req,res) =>{
        const db = req.app.get('db');
        db.posts.get_all_posts()
          .then(posts=> res.status(200).send(posts))
          .catch(err=> res.status(500).send(err));        
    },
    getPost: (req,res) =>{
        const {id} = req.params,
              db = req.app.get('db');
        db.posts.get_post(id)
          .then(post=> res.status(200).send(post))
          .catch(err=> res.status(500).send(err));        
    },
    getUserComments: (req, res)=>{
        const {id} = req.params,
              db = req.app.get('db');
        db.comments.get_user_comments(id)
          .then(comments => res.status(200).send(posts))
          .catch(err => console.log(err));
    },
    contactEmail : (req, res) =>{
        const { name, email, subject, content} = req.body
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
            from: `${name} <${email}>`,
            to: `Beanafide <${EMAIL}>`,
            subject: subject,
            text: content
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