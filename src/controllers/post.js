const path = require('path');
const {randomNumber} = require('../helpers/libs');
const fs = require ('fs-extra');
const md5 = require('md5');
const {Post, Comment} = require('../model');
const sidebar = require('../helpers/sidebar')

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
     const comments = await Comment.find({ post_id: post._id })
        .sort({timestamp: 1 })
        .lean({ virtuals: true });
        
   

    viewModel.comments = comments;
    viewModel = await sidebar(viewModel);

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
                    description: req.body.description,
                    user: req.user._id
                });
                
                const postSaved = await newPost.save();
                //res.send('works');
                res.redirect("/posts/" + postSaved.uniqueId);
            }else{
                await fs.unlink(postTempPath);
                res.status(500).json({error:'Only images are allowed'});
            }
            
        }
        
    };
    savePost();
    
};

ctrl.like = async(req, res)=>{
    const post = await Post.findOne({
        fileName: { $regex: req.params.post_id },
    });
    console.log(post);
    if (post) {
        post.likes = post.likes + 1;
        await post.save();
        res.json({ likes: post.likes });
    } else {
    res.status(500).json({ error: "Internal Error" });
    }
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
        res.redirect("/posts/" + post.uniqueId);
    } else {
        res.redirect("/");
    }
};

ctrl.delete = async(req, res)=>{
    const post = await Post.findOne({
        fileName: { $regex: req.params.post_id },
      });
      if (post) {
        await fs.unlink(path.resolve("./uploads/" + post.fileName));
        await Comment.deleteOne({ post_id: post._id });
        await post.remove();
        res.json(true);
      } else {
        res.json({ response: "Bad Request." });
      }
};
module.exports = ctrl;
