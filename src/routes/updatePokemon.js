const { ValidationError } = require('sequelize');
const { Pokemon } = require('../db/sequelize');
const auth = require('../auth/auth');

module.exports = (app) => {
  app.put('/api/pokemon/:id', auth, (req, res) => {
    Pokemon.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((_) => {
        return Pokemon.findByPk(req.params.id).then((pokemon) => {
          if (!pokemon) {
            const message = `Le pokemon demande n'existe pas. Reessayez un autre id`;
            return res.status(404).json({ message });
          }
          const message = `Le pokemon ${pokemon.name} a bien ete modifie.`;
          res.json({ message, data: pokemon });
        });
      })
      .catch((error) => {
        if (error instanceof ValidationError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        if (error instanceof UniqueConstraintError) {
          return res.status(400).json({ message: error.message, data: error });
        }
        const message = `Le pokemon n'a pas pu etre modifie`;
        res.status(500).json({ message, data: error });
      });
  });
};
