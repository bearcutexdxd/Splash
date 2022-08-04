const { User, Skin, User_Skin } = require('../../db/models');

const allSkinsGet = async (req, res) => {
  try {
    const allSkins = await Skin.findAll();
    return res.json(allSkins);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const skinPost = async (req, res) => {
  const { id, skinId, price } = req.body;
  const user = await User.findOne({ where: { id } });
  console.log('!!!!!', id, skinId);
  try {
    await User_Skin.create({
      user_id: id,
      skin_id: skinId,
    });
    if (price) {
      user.balance -= price;
      await user.save();
    }

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
};

const skinUserPut = async (req, res) => {
  const { id, newSkin } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (newSkin) {
      user.current_skin = newSkin;
    }
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const userSkinsGet = async (req, res) => {
  const { id } = req.params;
  try {
    const userSkins = await User.findByPk(id, {
      include: Skin,
    });
    return res.json(userSkins);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  allSkinsGet,
  skinPost,
  skinUserPut,
  userSkinsGet,
};
