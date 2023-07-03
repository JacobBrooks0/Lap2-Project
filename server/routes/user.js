const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", authenticator, userController.logout);

module.exports = userRouter;
