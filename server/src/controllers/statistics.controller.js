const { User, Statistics } = require('../../db/models');

const statPut = async (req, res) => {
  const {
    id, kills, deaths, loses, wins,
  } = req.body;
  try {
    const userStat = await Statistics.findOne({ where: { user_id: id } });
    if (kills) {
      userStat.kills += kills;
    }
    if (deaths) {
      userStat.deaths += deaths;
    }
    if (loses) {
      userStat.loses += loses;
    }
    if (wins) {
      userStat.wins += wins;
    }
    userStat.save();
    return res.sendStatus(200);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

const statGet = async (req, res) => {
  const { id } = req.params;
  console.log('!!!!!', id);
  try {
    const userStat = await User.findOne({ where: { id }, include: Statistics });
    return res.json(userStat);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  statPut,
  statGet,
};
