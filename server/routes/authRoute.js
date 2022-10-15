const route = require('express').Router();
const userController = require('../controllers/userController');
const auth = require("../middlewares/auth");

route.post('/register', userController.register);
route.post('/activate', userController.activate);
route.post('/signin', userController.signin);
route.post('/forgot_pass', userController.forgot);
route.post('/reset_pass', auth, userController.reset);
route.get('/signout', userController.signout);
route.post('/google_signin', userController.google);
route.post('/change_password', auth, userController.changePassword);
route.get('/getuser/:id', userController.getUser);
route.patch('/updateuser', auth, userController.updateUser);
route.post('/test', userController.test);

module.exports = route;