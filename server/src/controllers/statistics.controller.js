/* eslint-disable max-len */
const { User, Statistics } = require('../../db/models');

const statPut = async (req, res) => {
  const { gameState } = req.body;
  const { roomNicknames } = req.body;
  // console.log(gameState, roomNicknames);

  const data = roomNicknames.map((el) => {
    if (el.playerId === 1) {
      return { ...el, statistics: gameState.player1.statistics, isAlive: gameState.player1.isAlive };
    }
    if (el.playerId === 2) {
      return { ...el, statistics: gameState.player2.statistics, isAlive: gameState.player2.isAlive };
    }
    if (el.playerId === 3) {
      return { ...el, statistics: gameState.player3.statistics, isAlive: gameState.player3.isAlive };
    }
    if (el.playerId === 4) {
      return { ...el, statistics: gameState.player4.statistics, isAlive: gameState.player4.isAlive };
    }
    return el;
  });

  try {
    let user = await User.findOne({ where: { name: data[0].nickname } });
    user.balance += data[0].statistics.kills;
    await user.save();

    let stats = await Statistics.findOne({ where: { user_id: user.id } });
    stats.kills += data[0].statistics.kills;
    stats.deaths += data[0].statistics.deaths;
    stats.loses += data[0].statistics.loses;
    stats.wins += data[0].statistics.wins;
    stats.timePlayed += data[0].statistics.timePlayed;
    await stats.save();

    user = await User.findOne({ where: { name: data[1].nickname } });
    user.balance += data[1].statistics.kills;
    await user.save();

    stats = await Statistics.findOne({ where: { user_id: user.id } });
    stats.kills += data[1].statistics.kills;
    stats.deaths += data[1].statistics.deaths;
    stats.loses += data[1].statistics.loses;
    stats.wins += data[1].statistics.wins;
    stats.timePlayed += data[1].statistics.timePlayed;
    await stats.save();

    user = await User.findOne({ where: { name: data[2].nickname } });
    user.balance += data[2].statistics.kills;
    await user.save();

    stats = await Statistics.findOne({ where: { user_id: user.id } });
    stats.kills += data[2].statistics.kills;
    stats.deaths += data[2].statistics.deaths;
    stats.loses += data[2].statistics.loses;
    stats.wins += data[2].statistics.wins;
    stats.timePlayed += data[2].statistics.timePlayed;
    await stats.save();

    user = await User.findOne({ where: { name: data[3].nickname } });
    user.balance += data[3].statistics.kills;
    await user.save();

    stats = await Statistics.findOne({ where: { user_id: user.id } });
    stats.kills += data[3].statistics.kills;
    stats.deaths += data[3].statistics.deaths;
    stats.loses += data[3].statistics.loses;
    stats.wins += data[3].statistics.wins;
    stats.timePlayed += data[3].statistics.timePlayed;
    await stats.save();

    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
  }
};

const statGet = async (req, res) => {
  const { id } = req.params;
  console.log('!!!!!', id);
  try {
    const userStat = await Statistics.findAll({ where: { user_id: id } });
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
