const bcrypt = require('bcrypt');
const { User, Statistics } = require('../../db/models');

const signUp = async (req, res) => {
  const { playerName, password } = req.body;
  console.log(req.body);
  if (playerName && password) {
    try {
      const [user, created] = await User.findOrCreate({
        where: { name: playerName },
        defaults: {
          name: playerName,
          password: await bcrypt.hash(password, 10),
          current_skin: '/pipo-nekonin001.png',
          balance: 0,
        },
      });

      if (!created) {
        return res.status(401).json({ error: 'email already in use' });
      }
      await Statistics.bulkCreate([
        {
          kills: 0,
          deaths: 0,
          loses: 0,
          wins: 0,
          user_id: user.id,
        },

      ]);

      req.session.user = {
        id: user.id,
        name: user.name,
      };

      return res.json({ id: user.id, name: user.name });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.status(401).json({ error: 'empty input' });
};

const signIn = async (req, res) => {
  const { password, name } = req.body;

  if (password && name) {
    try {
      const currentUser = await User.findOne({ where: { name } });
      if (currentUser && await bcrypt.compare(password, currentUser.password)) {
        req.session.user = {
          id: currentUser.id,
          name: currentUser.name,
        };

        return res.json({ id: currentUser.id, name: currentUser.name });
      }
      return res.status(401).json({ error: 'incorrect credentials' });
    } catch (error) {
      console.error(error);
      return res.sendStatus(500);
    }
  }

  return res.status(401).json({ error: 'empty input' });
};

const signOut = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      console.error(error);
      return res.sendStatus(500);
    }

    res.clearCookie('user');

    return res.sendStatus(200);
  });
};

const checkAuth = async (req, res) => {
  try {
    const user = await User.findByPk(req.session.user.id);
    return res.json({
      id: user.id, name: user.name, skin: user.current_skin, balance: user.balance,
    });
  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
};

module.exports = {
  signIn,
  signOut,
  signUp,
  checkAuth,
};
