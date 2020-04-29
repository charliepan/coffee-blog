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
          .then(()=> res.sendStatus(200))
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
    }
}