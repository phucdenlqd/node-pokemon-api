const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
  app.put('/api/pokemon/:id', (req, res) => {
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
        const message = `Le pokemon n'a pas pu etre modifie`;
        res.status(500).json({ message, data: error });
      });
  });
};
