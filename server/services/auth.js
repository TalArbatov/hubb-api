const mongoose = require('mongoose');
const User = mongoose.model('User');
const swearjar = require('swearjar');

const getUserByEmail = async email => {
    const user = User.findOne({email})
    if(user)
        return user;
    else return null;
}
const getUserByUsername = async username => {
    const user = User.findOne({username})
    if(user)
        return user;
    else return null;
}

const validateSignupForm = async (form, conflict1, conflict2) => {
    const {username, email, password, confirmPassword} = form;

    const toReturn = {
        success: true,
        messages: []
    }
    // 1. validate unique user
    if(conflict1) {
        toReturn.success = false;
        toReturn.messages.push('Email already in use.')
    }
    if(conflict2) {
        toReturn.success = false;
        toReturn.messages.push('Username already in use.')
    }
    // 2. validate passwords
    if(password != confirmPassword) {
        toReturn.success = false;
        toReturn.messages.push('Passwords must match')
    }
    else if(!password) {
        toReturn.success = false;
        toReturn.messages.push('Please enter a password')
    }
    else if(password.length < 4 || password.length > 8) {
        toReturn.success = false;
        toReturn.messages.push('Password must be between 4 to 8 characters')
    }
    // 3. validate email
    if(!email) {
        toReturn.success = false;
        toReturn.messages.push('Please enter email address')   
    }
    else if(email.length < 4 || email.length > 8) {
        toReturn.success = false;
        toReturn.messages.push('Email must be between 4 to 8 characters')
    }
    // 4. validate username
    if(!username) {
        toReturn.success = false;
        toReturn.messages.push('Please enter a username')   
    }
    else if(username.length < 4 || username.length > 8) {
        toReturn.success = false;
        toReturn.messages.push('Username must be between 4 to 8 characters')
    }
    if(swearjar.profane(username)) {
        toReturn.success = false;
        toReturn.messages.push('Username must not contain profane words.')
    }



    return toReturn   
}

const initializeUser = form => {
    const {username, email, password} = form;
    const newUser = new User({
        username, email, password
    })
    return newUser;
}

const saveUser = async user => {
    //  user.save((err, doc) => {
    //     if(err) {
    //         console.log(err)
    //         return null;
    //     }
    //     else return doc
    // })
    try {
    const savedUser = await user.save()
    return savedUser
    }
    catch (e) {
        console.log(e);
        return null
    }
    
}

module.exports = {
    getUserByEmail,
    getUserByUsername,
    validateSignupForm,
    initializeUser,
    saveUser
}