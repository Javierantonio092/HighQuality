const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require ('fs-extra');
const md5 = require('md5');
const {Post} = require('../model');
const {Comment} = require('../model');
const ctrl = {};

ctrl.index =  async(req, res, next)=>{
    let viewModel = { post: {}, comments: [] };
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
    
    // get image comments
     const comments = await Comment.find({ post_id: post._id }).sort({
        timestamp: 1,
    });

    viewModel.comments = comments;

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

ctrl.comment = async(req, res)=>{
    const post = await Post.findOne({
        fileName: { $regex: req.params.post_id },
      });
      if (post) {
        const newComment = new Comment(req.body);
        newComment.gravatar = md5(newComment.email);
        newComment.post_id = post._id;
        
        await newComment.save();
        res.redirect("/posts/" + post.uniqueId + "#" + newComment._id);
    } else {
        res.redirect("/");
    }
};

ctrl.delete = (req, res)=>{
   
};
module.exports = ctrl;
