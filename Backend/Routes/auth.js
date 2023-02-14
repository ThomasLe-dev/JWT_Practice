const Router = require('express').Router();
const authController = require('../Controller/authController');

Router.post('/register', authController.register)

module.exports = Router;