const nodemailer = require('nodemailer');
require('dotenv').config();

module.exports = (user,req,createdUserId) => {

    // console.log(user);

    // console.log('createdUserId',createdUserId)

    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    let link = "http://" + "localhost:4000/confirm:" + createdUserId;

    const mailOptions = {
        to: user.email, // Cambia esta parte por el destinatario
        subject: 'Confirme su Correo Electrónico',
        html: `
            <h1><i>Nombre:</i> ${user.name}</h1> <br/>
            <h3><i>E-mail:</i> ${user.email} </h3> <br/>
            <h3>LINK:</h3> <a href=${link}>ENTRA AQUI </a>
            `,
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log('Email sent: ' + info.response);
    });
}