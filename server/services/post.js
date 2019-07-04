const mongoose = require('mongoose');
const Hub = mongoose.model('Hub');
const User = mongoose.model('User');
const Post = mongoose.model('Post')
const hubService = require('./hub')
const swearjar = require("swearjar");

// public - Anyone can view, post, and comment to this community
// restricted - Anyone can view this community, but only subscribed users can post
// private - Only admin can post, anyone can view
//secret - only admin can view and post.

canUserPost = async (hubName, user) => {
    const hub = await Hub.findOne({name: hubName});
   
    if(hub.privacy === 'public')
        return true;
    else if (hub.privacy === 'restricted') {
        if(hubService.isSubscriber(hubName, user))
            return true
        return false;
    }
    else if(hub.privacy === 'private' || hub.privacy === 'secret') {
        
        if(await hubService.isAdmin(hubName, user))
            return true;
        return false;
    }
    else    
        return false
}

validatePost = ({title, content}) => {
    const toReturn = {
        success: true,
        messages: []
    }
    //const {title, content} = post;
    if(swearjar.profane(title)) {
        toReturn.success = false;
        toReturn.messages.push('Title cannot contain profane words.')
    }
    if(swearjar.profane(description)) {
        toReturn.success = false;
        toReturn.messages.push('Description cannot contain profane words.')
    }
    return toReturn;
}

const intitializePost = ({title,content}, user) => {
    const newPost = new Post({
        title,
        content
    })
} 

module.exports = {
    canUserPost,
    validatePost,
}