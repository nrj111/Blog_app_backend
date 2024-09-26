//import model
const Post = require("../models/postModel")
const Like = require("../models/likeModel");

//like post

exports.likePost = async (req,res) => {
    try{
        const {post, user} = req.body;
        //create a like object
        const like = new Like({
            post,user,
        });

        //save the new like into the database
        const savedLike = await like.save();

        //find the post by ID, and add the like in new comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {likes: savedLike._id} } , {new:true} )
        .populate("likes").exec();
        res.json({
            post: updatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error:"Error while Liking the post",
        });
    }
}

//unlike post
exports.unlikePost = async (req,res) => {
    try{
        const {post, like} = req.body;
        // find by id and delete
        const deletedLike = await Like.findOneAndDelete({post:post, _id:like});
        
        //update the Post collection
        const updatedPost = await Post.findByIdAndUpdate(post, 
                                                {$pull: {likes:deletedLike._id} }, 
                                                {new:true});
        res.json({
            post:updatedPost,
        })
    }
    catch(error){
        return res.status(500).json({
            error:"Error while Unliking the post",
        });
    }
}