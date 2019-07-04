const Hub = require("mongoose").model("Hub");
const Post = require('mongoose').model('Post')
const router = require("express").Router();
const passport = require("passport");
const postService = require('../services/post');

const getPosts = async (req,res,next) => {
    const posts = await Post.find({})
    return res.send(posts)
}

const getPost = async (req,res,next) => {
    const postID = req.params.postID;
    const post = await Post.findById({postID})
    if(post)
        return res.send(post)
    else
        return res.sendStatus(409)
}

const submitPost = async (req,res,next) => {
    const hubName = req.params.hub;
    const user = req.user;
    const canUserPost = await postService.canUserPost(hubName, user);
    if(!canUserPost)
        res.sendStatus(403)
    
}


module.exports = {
    getPosts,
    getPost,
    submitPost
}