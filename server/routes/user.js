const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", authenticator, userController.logout);
userRouter.get("/:user_id/skills", userController.getUserSkills);
userRouter.get("/:userId/classes", userController.getUserClasses);
userRouter.get("/:userId/events", userController.getUserEvents);

module.exports = userRouter;
