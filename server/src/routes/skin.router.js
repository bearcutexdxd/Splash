const router = require('express').Router();
const { Skin } = require('../../db/models');

router
  .route('/')
  .get(async (req, res) => {
    try {
      const allSkins = await Skin.findAll();
      return res.json(allSkins);
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  });

module.exports = router;
