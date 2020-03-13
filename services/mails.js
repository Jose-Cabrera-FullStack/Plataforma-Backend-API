const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = (form) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL, 
            pass: process.env.PASSWORD 
        }
    });

    let userHost = transporter.options.auth.user

    const mailOptions = {
        from: `<${form.nombre}>`,
        to: userHost, // Cambia esta parte por el destinatario
        subject: form.case,
        html: `
            <h1><i>Nombre:</i> ${form.name}</h1> <br/>
            <h2><i>Asunto:</i> ${form.case} </h2> <br/>
            <h3><i>E-mail:</i> ${form.email} </h3> <br/>
            <h3>Mensaje:</h3> <h4>${form.message}</h4>
            `,
        text: form.message
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log('Email sent: ' + info.response);
    });
}