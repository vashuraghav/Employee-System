const UserService = require('../service/UserService');

const createUser = async (req, res)=>{
    const createUserRequest = req.body;
    try{
        const createdUser = await UserService.createUser(createUserRequest);
        res.status(200).json({"success" : true, "data": createdUser});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getUser = async (req, res)=>{
    const userId = req.params.id;
    try{
        const getUser = await UserService.getUser(userId);
        res.status(200).json({"success" : true, "data": getUser});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getUserbyEmail = async (req, res)=>{
    const emailId = req.body.email;
    try{
        const getUser = await UserService.getUserByEmail(emailId);
        res.status(200).json({"success" : true, "data": getUser});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

module.exports = {createUser, getUser, getUserbyEmail};