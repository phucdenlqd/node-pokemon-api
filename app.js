const express = require('express');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/db/sequelize');
const findAllPokemons = require('./src/routes/findAllPokemons');
const findPokemonByPk = require('./src/routes/findPokemonByPk');
const createPokemon = require('./src/routes/createPokemon');
const updatePokemon = require('./src/routes/updatePokemon');
const deletePokemon = require('./src/routes/deletePokemon');
const login = require('./src/routes/login');

const app = express();
const port = process.env.PORT || 3000;

app.use(favicon(__dirname + '/favicon.ico')).use(bodyParser.json()).use(cors())

sequelize.initDb();

app.get('/', (req, res) => {
  res.json('Hello, Heroku');
});

findAllPokemons(app);
findPokemonByPk(app);
createPokemon(app);
updatePokemon(app);
deletePokemon(app);
login(app);

// On ajoute la gestion des erreurs 404
app.use(({ res }) => {
  const message =
    'Impossible de trouver la ressource demande ! Vous pouvez essayer une autre URL';
  res.status(404).json({ message });
});

app.listen(port, () =>
  console.log(`Notre application est demarree sur: http://localhost:${port}`)
);
