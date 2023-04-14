const UserRepo = require('../repo/UserRepo');

const createUser = async (createUserRequest)=>{
    const user = await UserRepo.createUser(createUserRequest);
    return user;
}

const getUser = async (id)=>{
    const user = await UserRepo.getUser(id);
    return user;
}

const getUserByEmail = async (emailId)=>{
    const user = await UserRepo.getUserByEmail(emailId);
    return user;
}

module.exports = {createUser, getUser, getUserByEmail};