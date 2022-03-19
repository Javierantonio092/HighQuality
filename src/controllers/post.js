const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require ('fs-extra');
const {Post} = require('../model');
const ctrl = {};

ctrl.index = (req, res)=>{
    
};

ctrl.create  =  (req, res)=>{

    const savePost = async ()=>{
        const postURl= randomNumber();
        const posts = await Post.find({fileName : postURl});
        if(posts.length > 0){
            savePost();
        }else{
            console.log(postURl);
            const postTempPath = req.file.path;
            const ext = path.extname(req.file.originalname).toLowerCase();
            const targetPath= path.resolve('src/public/upload/'+postURl+ext);
        
            if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif'){
                await fs.rename(postTempPath, targetPath);
                const newPost = new Post({
                    title: req.body.title,
                    fileName: postURl + ext,
                    description: req.body.description
                });
                const postSaved = await newPost.save();
                res.send('works');
               // res.redirect('/index');
            }else{
                await fs.unlink(postTempPath);
                res.status(500).json({error:'Only images are allowed'});
            }
            
        }
        
    };
    savePost();
    
};

ctrl.like = (req, res)=>{
   
};

ctrl.comment = (req, res)=>{
   
};

ctrl.delete = (req, res)=>{
   
};
module.exports = ctrl;
