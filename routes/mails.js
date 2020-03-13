const express = require('express');

const configMensaje = require('../services/mails');

function emailApi(app){
    const router = express.Router();

    app.use("/api/email", router);

    router.post("/", (req,res) => {
        // console.log(req)
        configMensaje(req.body);
        res.status(200).send();
    });

}

module.exports = emailApi;