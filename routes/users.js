const express = require('express');
const passport = require('passport');
const UsersService = require('../services/users')
const joi = require('@hapi/joi')

const {
    userIdSchema,
    createUserSchema,
    updateUserSchema
} = require('../utils/schema/users');

const validationHandler = require('../utils/middleware/validationHandler');
const scopesValidationsHandler = require('../utils/middleware/scopesValidationsHandler');

const cacheResponse = require('../utils/cacheReponse');
const {
    FIVE_MINUTES_IN_SECONDS,
    SIXTY_MINUTES_IN_SECONDS
} = require('../utils/time');

//JWT strategies
require('../utils/auth/strategies/jwt');

function usersApi(app) {
    const router = express.Router();
    const usersService = new UsersService();

    app.use("/api/users", router);


    router.get("/", passport.authenticate('jwt', {
        session: false
    }), scopesValidationsHandler(['read:users']), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const {
            tags
        } = req.query;

        try {
            const users = await usersService.getUsers({
                tags
            });
            // throw new Error ('Error Getting users')
            res.status(200).json({
                data: users,
                message: 'users listed'
            });

        } catch (err) {
            next(err)
        }
    });

    router.get("/ids",validationHandler(joi.object({
        userId: userIdSchema
    }), 'params'), async function (req, res, next) {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
        const {
            _id
        } = req.query;
        
        try {
            const users = await usersService.getUsers({
                _id
            });

            res.status(200).json({
                data: users,
                message: 'users listed'
            });
            
        } catch (err) {
            next(err)
        }
    });

    router.get("/:userId",
        passport.authenticate('jwt', {
            session: false
        }), scopesValidationsHandler(['read:users']), 
        validationHandler(joi.object({
            userId: userIdSchema
        }), 'params'), async function (req, res, next) {
            cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
            const {
                userId
            } = req.params;

            try {
                const users = await usersService.getUserId({
                    userId
                });

                res.status(200).json({
                    data: users,
                    message: 'users retrieved'
                });

            } catch (err) {
                next(err)
            }
        });
    router.post("/", passport.authenticate('jwt', {
        session: false
    }), scopesValidationsHandler(['create:users']), validationHandler(createUserSchema), async function (req, res, next) {
        const {
            body: user
        } = req;

        try {
            const createdUsersId = await usersService.createUser({
                user
            });

            res.status(201).json({
                data: createdUsersId,
                message: 'users created'
            });

        } catch (err) {
            next(err)
        }
    });
    router.put("/:userId", passport.authenticate('jwt', {
        session: false
    }), scopesValidationsHandler(['update:users']), validationHandler(joi.object({
        userId: userIdSchema
    }), 'params'), validationHandler(updateUserSchema), async function (req, res, next) {
        const {
            userId
        } = req.params;
        const {
            body: user
        } = req;

        try {
            const updateUserId = await usersService.updateUser({
                userId,
                user
            });

            res.status(200).json({
                data: updateUserId,
                message: 'users updated'
            });

        } catch (err) {
            next(err)
        }
    });

    router.patch('/:userId', passport.authenticate('jwt', {
        session: false
    }), scopesValidationsHandler(['delete:users']), validationHandler(joi.object({
        userId: userIdSchema
    }), 'params'), validationHandler(updateUserSchema), async (req, res, next) => {
        const {
            userId
        } = req.params;
        const {
            body: user
        } = req;

        try {
            const partiallyUpdatedUserId = await usersService.partialUpdateUser({
                userId,
                user
            })

            res.status(200).json({
                data: partiallyUpdatedUserId,
                message: 'partially updated user'
            })
        } catch (err) {
            next(err)
        }
    })

    router.delete("/:userId", validationHandler(joi.object({
        userId: userIdSchema
    }), 'params'), async function (req, res, next) {
        const {
            userId
        } = req.params;

        try {
            const deletedMovieId = await usersService.deleteUser({
                userId
            });

            res.status(200).json({
                data: deletedMovieId,
                message: 'users deleted'
            });

        } catch (err) {
            next(err)
        }
    });

}

module.exports = usersApi;