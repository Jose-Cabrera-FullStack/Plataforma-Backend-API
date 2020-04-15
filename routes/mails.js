const express = require('express');

const configMessage = require('../services/mails');


function emailApi(app) {
    const router = express.Router();

    app.use("/api/email", router);

    router.post("/", (req, res) => {
        // console.log(req)
        configMessage(req.body);
        res.status(200).send();
    });

}

module.exports = emailApi;