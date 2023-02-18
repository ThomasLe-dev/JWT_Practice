const Router = require('express').Router();
const userController = require('../Controller/userController');
const middlewareController = require('../Controller/middlewareController');

Router.get('/',middlewareController.verifyToken , userController.getAllUser);
Router.delete('/:id',middlewareController.veriryTokenAndAdminAuth, userController.deleteUser);

module.exports = Router;