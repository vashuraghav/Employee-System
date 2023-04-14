const EmailSchema  = require("../models/EmailSchema");

const saveEmail = async(email)=> {
    const newEmail = new EmailSchema(email);
    return await newEmail.save();
}

const getEmail = async(id)=> {
    const email = await EmailSchema.findOne({_id: id});
    return email;
}

const getEmails = async(threadId)=> {
    const emails = await EmailSchema.find({ thread_id: { $ne: null, $eq: threadId } });
    return emails;
}

module.exports = {saveEmail, getEmail ,getEmails}