import {errorHandler} from '../utils/error.js';
import Post from '../models/post.model.js';


export const createPost = async (req,res,next) => {
    console.log(req.user);
    if(!req.user.isAdmin){
        return next(errorHandler(403,'You are not allowed to create post'));
    }
    console.log(req.body.title + ' content '+ req.body.content);
    if(!req.body.title || !req.body.content){
        return next(errorHandler(400,'Please provide all required fields'));
    }

    const slug = req.body.title.split(' ').join('-').toLowerCase().replace(/[^a-zA-Z0-9-]/g, '-');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.user.id,
    });
    
    try{
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }catch(error){
        next(error);
    }
}