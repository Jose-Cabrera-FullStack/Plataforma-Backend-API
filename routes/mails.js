const express = require('express');

const configMessage = require('../services/mails');

//JWT strategies
require('../utils/auth/strategies/jwt');


function emailApi(app) {
    const router = express.Router();

    app.use("/api/email", router);

    router.post("/", (req, res) => {
        // console.log(req)
        configMessage(req.body);
        res.status(200).send();
    });
    

    router.post("/confirm", async (req, res) => {
     
        // const {id} = req.body

        // const verified = true

        try{    

            // const updateUserId = await usersService.updateUser({
            //     id,
            //     verified
            // }); -------------->Arreglar

            res.status(200).json({
                data:'updateUserId',
                message: `recibi el mensaje ${req.body.id}`
            });
            // console.log(req.body.id)

        }catch(e){
            res.send('error')
        }
    });

}

module.exports = emailApi;