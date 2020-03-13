const nodemailer = require('nodemailer');

module.exports = (formulario) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'SummonersCaves@gmail.com', // Cambialo por tu email
            pass: 'josebeaguido' // Cambialo por tu password
        }
    });

    let userHost = transporter.options.auth.user

    const mailOptions = {
        from: `<${formulario.nombre}>`,
        to: userHost, // Cambia esta parte por el destinatario
        subject: formulario.asunto,
        html: `
            <h1><i>Nombre:</i> ${formulario.nombre}</h1> <br/>
            <h2><i>Asunto:</i> ${formulario.asunto} </h2> <br/>
            <h3><i>E-mail:</i> ${formulario.email} </h3> <br/>
            <h3>Mensaje:</h3> <h4>${formulario.mensaje}</h4>
            `,
        text: formulario.mensaje
    };
    transporter.sendMail(mailOptions, function (err, info) {
        if (err)
            console.log(err)
        else
            console.log('Email sent: ' + info.response);
    });
}