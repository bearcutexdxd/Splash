const { Router } = require('express');

const roomsController = require('../controllers/rooms.controller');

const roomsRouter = Router();
roomsRouter.get('/users', roomsController.usersGet);

module.exports = roomsRouter;
