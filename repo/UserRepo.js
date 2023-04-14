const UserSchema  = require("../models/UserSchema");

const createUser = async(user)=> {
    const newUser = new UserSchema(user);
    return await newUser.save();
}

const getUser = async(id)=> {
    const user = await UserSchema.findOne({_id: id});
    return user;
}

const getUserByEmail = async(emailId)=> {
    const user = await UserSchema.findOne({email: emailId});
    return user;
}

module.exports = {createUser, getUser, getUserByEmail}