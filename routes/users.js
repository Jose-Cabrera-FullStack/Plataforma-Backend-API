const express = require('express');
const UsersService = require('../services/users')

function usersApi(app) {
    const router = express.Router();
    app.use("/api/users", router);

    const usersService = new UsersService();

    router.get("/", async function(req, res, next){
        const{tags} = req.query;
        
        try{
            const users = await usersService.getUsers({tags});
            // throw new Error ('Error Getting users')
            res.status(200).json({
                data: users,
                message: 'users listed'
            });

        }catch(err){
            next(err)
        }
    });
    
    router.get("/:userId", async function(req, res, next){
        const { userId } = req.params;

        try{
            const users = await usersService.getUser({ userId });

            res.status(200).json({
                data: users,
                message: 'users retrieved'
            });

        }catch(err){
            next(err)
        }
    });
    router.post("/", async function(req, res, next){
        const { body: user} = req;

        try{
            const createdUsersId = await usersService.createUser({ user });

            res.status(201).json({
                data: createdUsersId,
                message: 'users created'
            });

        }catch(err){
            next(err)
        }
    });
    router.put("/:userId", async function(req, res, next){
        const { userId } = req.params;
        const { body: user} = req;

        try{
            const updateMovieId = await usersService.updateUser({
                userId,
                user
            });

            res.status(200).json({
                data: updateMovieId,
                message: 'users updated'
            });

        }catch(err){
            next(err)
        }
    });

    router.patch('/:userId', async (req, res, next) => {
        const { userId } = req.params;
        const { body: user} = req;
    
        try{
            const partiallyUpdatedUserId = await usersService.partialUpdateUser({
                userId,
                user
                })
    
            res.status(200).json({
                data: partiallyUpdatedUserId,
                message: 'partially updated user'
            })
        }catch(err) {
            next(err)
        }
    })

    router.delete("/:userId", async function(req, res, next){
        const { userId } = req.params;

        try{
            const deletedMovieId = await usersService.deleteUser({ userId });

            res.status(200).json({
                data: deletedMovieId,
                message: 'users deleted'
            });

        }catch(err){
            next(err)
        }
    });

}

module.exports = usersApi;