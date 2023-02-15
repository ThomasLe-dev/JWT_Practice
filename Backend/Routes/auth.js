const Router = require('express').Router();
const authController = require('../Controller/authController');


Router.post('/register', authController.register);
Router.post('/login', authController.login);

module.exports = Router;