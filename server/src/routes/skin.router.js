const { Router } = require('express');
const skinController = require('../controllers/skin.controller');

const skinRouter = Router();
skinRouter.get('/', skinController.allSkinsGet);
skinRouter.post('/', skinController.skinPost);
skinRouter.get('/user/:id', skinController.userSkinsGet);
skinRouter.put('/user', skinController.skinUserPut);

module.exports = skinRouter;
