/* eslint-disable max-len */
const { User, Statistics } = require('../../db/models');

const statPut = async (req, res) => {
  console.log('pls work');
  const { gameState } = req.body;
  const { roomNicknames } = req.body;
  console.log(gameState, roomNicknames);

  const data = roomNicknames.map((el) => {
    if (el.playerId === 1) {
      return { ...el, statistics: gameState.player1.statistics };
    }
    if (el.playerId === 2) {
      return { ...el, statistics: gameState.player2.statistics };
    }
    if (el.playerId === 3) {
      return { ...el, statistics: gameState.player3.statistics };
    }
    if (el.playerId === 4) {
      return { ...el, statistics: gameState.player4.statistics };
    }
    return el;
  });

  data.forEach(async (el) => {
    try {
      const user = await User.findOne({ where: { name: el.nickname, include: { model: Statistics } } });
      console.log('nice', user);
      user.Statistics.kills += el.statistics.kills;
      user.Statistics.deaths += el.statistics.deaths;
      user.Statistics.wins += el.statistics.wins;
      user.Statistics.loses += el.statistics.loses;

      await user.save();
      res.sendStatus(200);
    } catch (error) {
      res.sendStatus(500);
    }
  });
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
