const { Router } = require('express');

const statisicsController = require('../controllers/statistics.controller');

const statisicsRouter = Router();

statisicsRouter.get('/:id', statisicsController.statGet);
statisicsRouter.patch('/new', statisicsController.statPut);

module.exports = statisicsRouter;
