const UserRepo = require('../repo/UserRepo');

const createUser = async (createUserRequest)=>{
    try{
        const user = await UserRepo.createUser(createUserRequest);
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Create User Failure");
    }
}

const getUser = async (id)=>{
    try{
        const user = await UserRepo.getUser(id);
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Get User Failure");
    }
}

const getUserByEmail = async (emailId)=>{
    try{
        const user = await UserRepo.getUserByEmail(emailId);
        return user;
    }catch(err){
        console.log(err);
        throw new Error("Get User By Email Failure");
    }
}

module.exports = {createUser, getUser, getUserByEmail};