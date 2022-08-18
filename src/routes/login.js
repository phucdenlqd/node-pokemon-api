const { User } = require('../db/sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const privateKey = require('../auth/private_key');

module.exports = (app) => {
  app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username } })
      .then((user) => {
        if (!user) {
          const message = 'L utilisateur n existe pas';
          res.status(404).json({ message });
        }

        bcrypt.compare(password, user.password).then((isPassWordValid) => {
          if (isPassWordValid) {
            const message = 'L utilisateur a ete bien connecte';

            const token = jwt.sign({ userId: user.id }, privateKey, {
              expiresIn: '24h',
            });
            res.json({ message, data: user, token });
          } else {
            const message = 'Le mot de passe n est pas correct';
            res.status(401).json({ message });
          }
        });
      })
      .catch((error) => {
        const message = 'L utilisateur n a pas pu etre connecte avec succes.';
        res.status(404).json({ message, data: error });
      });
  });
};
