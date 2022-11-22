class PostMan {

    static sendEmail(req) {
        //Sending Email
        var nodemailer = require('nodemailer');

        var smtpConfig = {
            host: 'smtp.office365.com',
            port: 587,
            secure: false, // use SSL
            auth: {
                user: 'mahfuzrahid@outlook.com',
                pass: 'bangladesh71'
            }
        };

        var transporter = nodemailer.createTransport(smtpConfig);

        var mailOptions = {
            envelope: {
                from: 'mahfuzrahid@outlook.com', // sender address
                to: req.from    // list of receivers
            },
            raw: {
                path: './email.eml'
            }
        };

        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                return console.log(error);
            }
            console.log('Message sent: ' + info.response);
        });
    }
}

module.exports = PostMan