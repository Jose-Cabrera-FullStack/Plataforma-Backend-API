const express = require('express');
// const passport = require('passport');
// const UsersService = require('../services/users')
// const joi = require('@hapi/joi')

const configMessage = require('../services/mails');
// const updateUser = require('../services/users');

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
            // });

            res.status(200).json({
                data:"updateUserId",
                message: `recibi el mensaje ${req.body.id}`
            });
            // console.log(req.body.id)

        }catch(e){
            res.send('error')
        }
    });

}

module.exports = emailApi;