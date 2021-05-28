const nodemailer = require('nodemailer');
const { EMAIL, MAIL_PASS } = process.env;
exports.sendToMail = (to, code) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            port: 587,
            auth: {
                user: EMAIL,
                pass: MAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: EMAIL,
            to,
            subject: "Verification",
            html: `<h1>Your verification code is: ${code} <br /> This code will expire in 24 hours</h1>`,
        };
        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    reject(error);
                    console.log(error);
                }
                else {
                    console.log('info', info);
                    resolve(true);
                }
                transporter.close();
            });
        });
    }
    catch (err) {
        return new Error(err);
    }
};
//# sourceMappingURL=index.js.map