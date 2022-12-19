const SendEmail = async (email: string, body: string, title: string) => {
    
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        }
    });
    const mailOptions = {
        from: 'Union Events',
        to: email,
        subject: title,
        html: body
    };
    transporter.sendMail(mailOptions, function (error:any) {
        if (error) {
            console.log(error);
        } 
    }
    );
}

export default SendEmail;