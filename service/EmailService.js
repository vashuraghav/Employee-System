const EmailRepo = require('../repo/EmailRepo');
const OrderService = require('./OrderService');
const UserService = require('./UserService');
const nodemailer = require('nodemailer');
const config = require('../config');


const getAllEmails = async (threadId)=>{
    const email = await EmailRepo.getEmail(threadId);
    const emails = await EmailRepo.getEmails(threadId);
    if(email) return [email].concat(emails);
    else return emails
}

const createAndSendEmail = async (emailRequest)=>{
    const user = await UserService.getUser(emailRequest['id']);
    emailRequest['from'] = user['email'];
    const orderId  = emailRequest['order_id']
    const orderItemId = emailRequest['order_item_id']
    const order = await OrderService.getOrderByIds(orderId, orderItemId);

    if(user['role'] == "reseller"){
        emailRequest['to'] = order['user']['email']
    }else if(user['role'] == "customer"){
        emailRequest['to'] = order['items'][0]['reseller']['email'];
    }
    await sendEmail(emailRequest);
    return await saveEmail(emailRequest);
}

const saveEmail = async (sendEmailRequest)=>{
    const toUser = await UserService.getUserByEmail(sendEmailRequest['to']);
    const saveRequest = {
        subject: sendEmailRequest['subject'],
        body: sendEmailRequest['body'],
        order_item_id: sendEmailRequest['order_item_id'],
        from: sendEmailRequest['id'],
        to: toUser._id,
        reply_id : sendEmailRequest['reply_id'],
        thread_id : sendEmailRequest['thread_id']
    }
    const email = await EmailRepo.saveEmail(saveRequest);
    return {
        "thread_id" : email.thread_id || email._id,
        "message_id": email._id,
        "reply_id": email.reply_id
    }
}

const sendEmail = async (sendEmailRequest)=>{
    // Create a transport object using the nodemailer library
    const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'noreplypaysfer@gmail.com',
        pass: 'noreply@12345',
    },
    });

    // Send the email
    await transporter.sendMail({
    from: config.EMAIL_ADDRESS,
    to: sendEmailRequest['to'],
    subject: sendEmailRequest['subject'],
    text: sendEmailRequest['body']
    });
}

module.exports = {createAndSendEmail, getAllEmails};