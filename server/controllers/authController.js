const bcrypt = require('bcryptjs');


module.exports = {
    register: async(req,res) =>{
        const {username, email, password, admin, picture} = req.body,
              db =req.app.get('db');
        //check if user exists and avoid duplicates
        const checkUser = await db.users.check_user(email);
        if(checkUser[0]){
            return res.status(400).send('Email already in use');
        }

        // hash password and create user
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(password, salt);
        // username,
        // email,
        // password,
        // admin,
        // profile_pic
        const newUser = await db.users.register_user(username, email, hash, admin, picture);
        req.session.user = newUser[0];
        res.status(201).send(req.session.user);
    },
    login: async(req,res)=>{
        const {email, password} = req.body,
              db = req.app.get('db');
        let checkUser = await db.users.check_user(email);
        if(!checkUser[0]){
            return res.status(400).send('User does not exist');
        }

        //Check password with hash
        const auth = bcrypt.compareSync(password, checkUser[0].password);
        if(!auth){
            return res.status(401).send('Password is incorrect');
        }

        // Place user on session
        delete checkUser[0].password;
        req.session.user = checkUser[0];
        res.status(202).send(req.session.user);
    },
    logout: async(req,res)=>{
        req.session.destroy();
        res.sendStatus(200);
    }
}