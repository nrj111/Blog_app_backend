//import model
const Post = require("../models/postModel")
const comment = require("../models/commentModel");

//Business Logic

exports.createComment = async (req,res) => {
    try{
        //fatch data from request body
        const {post, user, body} = req.body;
        //create a comment object
        const comment = new Comment({
            post,user,body
        });

        //save the new comment into the database
        const savedComment = await comment.save();

        //find the post by ID, and add the comment in new comment array
        const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} } , {new:true} )
                            .populate("comments") //populate the comments array with comments document
                            .exec();

        res.json({
            post: updatedPost,
        });
    }
    catch(error){
        return res.status(500).json({
            error:"Error while creating comment",
        });
    }
}
