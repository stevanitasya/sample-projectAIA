const nodemailer = require('nodemailer');
require('dotenv').config();

const SendingEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.HOST,
            service: process.env.SERVICE,
            port: 587,
            secure: true,
            auth: {
                user: process.env.USER,
                pass: process.env.PASS,
            },
        });

        await transporter.SendEmail({
            from: process.env.USER,
            to: email,
            subject: subject,
            text: text,
        });
        console.log('email sent sucessfully');
        
    } catch (err) {
        console.log(err, 'email not sent');
    }
}

module.exports = SendingEmail;