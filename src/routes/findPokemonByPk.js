const { Pokemon } = require('../db/sequelize');

module.exports = (app) => {
  app.get('/api/pokemons/:id', (req, res) => {
    Pokemon.findByPk(req.params.id)
      .then((pokemon) => {
        if (!pokemon) {
          const message = `Le pokemon demande n'existe pas. Reessayez un autre id`;
          return res.status(404).json({ message });
        }
        const message = 'Un pokémon a bien été trouvé.';
        res.json({ message, data: pokemon });
      })
      .catch((error) => {
        const message = `La liste des pokémons n'a pas pu etre récupérée. Reessayez dans quelques instants.`;
        res.status(500).json({ message, data: error });
      });
  });
};
