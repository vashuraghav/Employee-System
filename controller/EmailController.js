const EmailService = require('../service/EmailService');

const sendEmail = async (req, res)=>{
    const emailRequest = req.body;
    try{
        const email = await EmailService.createAndSendEmail(emailRequest);
        res.status(200).json({"success" : true, "data": email});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

const getAllEmails = async (req, res)=>{
    const threadId = req.params.threadId;
    try{
        const emails = await EmailService.getAllEmails(threadId);
        res.status(200).json({"success" : true, "data": emails});
    }catch(err){
        console.log(err);
        res.status(404).send({"success": false , "error_message": err.message});
    }
};

module.exports = {sendEmail, getAllEmails};