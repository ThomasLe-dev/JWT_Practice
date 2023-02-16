const Router = require('express').Router();
const userController = require('../Controller/userController');

Router.get('/', userController.getAllUser);
Router.delete('/:id', userController.deleteUser);

module.exports = Router;