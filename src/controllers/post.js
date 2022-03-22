const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require ('fs-extra');
const {Post} = require('../model');
const ctrl = {};

ctrl.index =  async(req, res, next)=>{
    let viewModel = { post: {} };
    const post = await Post.findOne({
        fileName: {$regex: req.params.post_id},
    });

    // if image does not exists
  if (!post) return next(new Error("Image does not exists"));

  // increment views
    const updatedPost = await Post.findOneAndUpdate(
        { _id: post.id },
        { $inc: { views: 1 } }
    ).lean();
    viewModel.post = updatedPost;

    console.log(viewModel)
    res.render('posts', viewModel);
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
            const targetPath= path.resolve(`./uploads/${postURl}${ext}`);
        
            if (ext == '.png' || ext == '.jpg' || ext == '.jpeg' || ext == '.gif'){
                await fs.rename(postTempPath, targetPath);
                const newPost = new Post({
                    title: req.body.title,
                    fileName: postURl + ext,
                    description: req.body.description
                });
                const postSaved = await newPost.save();
                //res.send('works');
                res.redirect("/posts/" +postURl );
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
   console.log(req.body);
   res.send('comment');
};

ctrl.delete = (req, res)=>{
   
};
module.exports = ctrl;
