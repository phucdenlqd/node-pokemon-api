const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
  app.delete('/api/pokemon/:id', (req, res) => {
    const id = req.params.id;
    Pokemon.findByPk(id)
      .then((pokemon) => {
        const pokemonDeleted = pokemon;
        if (!pokemon) {
          const message = `Le pokemon demande n'existe pas. Reessayez un autre id`;
          return res.status(404).json({ message });
        }
        return Pokemon.destroy({ where: { id: pokemon.id } }).then((_) => {
          const message = `Le pokemon avec id ${pokemonDeleted.id} a bien ete supprime`;
          res.json({ message, data: pokemonDeleted });
        });
      })
      .catch((error) => {
        const message = `Le pokemon n'a pas pu etre supprime`;
        res.status(500).json({ message, data: error });
      });
  });
};
