const { Router } = require('express');
const authenticator = require('../middleware/authenticator')
const UserController = require('../controllers/user.js');

const userRouter = Router();

<<<<<<< HEAD
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.delete("/logout", authenticator, userController.logout);
userRouter.get("/:user_id/skills", userController.getUserSkills);
userRouter.get("/:userId/classes", userController.getUserClasses);
userRouter.get("/:userId/events", userController.getUserEvents);
=======
userRouter.post("/register", UserController.register);
userRouter.post("/login", UserController.login);

userRouter.use(authenticator); 

userRouter.patch("/update", UserController.updateProfileDetails);
userRouter.delete("/logout", UserController.logout);
>>>>>>> cd650894a7f163208eb145e8ce022d98549de56f

module.exports = userRouter;
