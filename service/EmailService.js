const EmailRepo = require('../repo/EmailRepo');
const OrderService = require('./OrderService');
const UserService = require('./UserService');
const nodemailer = require('nodemailer');
const config = require('../config');
const sgTransport = require('nodemailer-sendgrid-transport');


const getAllEmails = async (threadId)=>{
    try {
        const email = await EmailRepo.getEmail(threadId);
        const emails = await EmailRepo.getEmails(threadId);
        if(email) return [email].concat(emails);
        else return emails
    }catch(err){
        console.log(err);
        throw new Error("Get email fails");
    }
}

const createAndSendEmail = async (emailRequest)=>{
    try {
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
    }catch(err){
        console.log(err);
        throw new Error("Email Send Failure");
    }
}

const saveEmail = async (sendEmailRequest)=>{
    try {
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
    }catch(err){
        console.log(err);
        throw new Error();
    }
}

const sendEmail = async (sendEmailRequest)=>{
    // Create a transport object using the nodemailer library
    const options = {
        auth: {
          api_key: config.API_KEY
        }
      };
      
    const transporter = nodemailer.createTransport(sgTransport(options));

    const mailOptions = {
        from: config.EMAIL_ADDRESS,
        to: sendEmailRequest['to'],
        subject: sendEmailRequest['subject'] || "Reply",
        text: sendEmailRequest['body']
        };
      
    // Send the email
    console.log(mailOptions);
    try{
        await transporter.sendMail(mailOptions);
        console.log('Email sent');
      }catch (error) {
        console.error(error);
        throw new Error();
    }
}

module.exports = {createAndSendEmail, getAllEmails};