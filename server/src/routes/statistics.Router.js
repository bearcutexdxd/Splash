const { Router } = require('express');

const statisicsController = require('../controllers/statistics.controller');

const statisicsRouter = Router();
statisicsRouter.put('/statistics', statisicsController.statPut);
statisicsRouter.get('/statistics', statisicsController.statGet);

module.exports = statisicsRouter;
