const express = require('express');
const userRouter = express.Router();
const userController = require('./user-controller');
const middleWare = require('../utils/middleWare')

userRouter.post('/sign-up',userController.signup);
userRouter.post('/login',middleWare.authenticate,userController.login);
userRouter.get('/',middleWare.authenticate,userController.getUserList);
userRouter.get('/:id',middleWare.authenticate,userController.getUserList);
userRouter.put('/',middleWare.authenticate,userController.update);
userRouter.delete('/:id',middleWare.authenticate,userController.delete);

module.exports= userRouter
