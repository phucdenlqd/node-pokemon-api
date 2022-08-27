const { Sequelize, DataTypes } = require('sequelize');
const PokemonModel = require('../models/pokemon');
const UserModel = require('../models/user');
const pokemons = require('./mock-pokemon');
const bcrypt = require('bcrypt');

let sequelize;
if (process.env.NODE_ENV == 'production') {
  sequelize = new Sequelize(
    'davhhuh4yu3qdv74',
    'byoh7r55ukwz952s',
    'om5iwvouhl27rdgb',
    {
      host: 'cxmgkzhk95kfgbq4.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
      dialect: 'mariadb',
      dialectOptions: {
        timezone: 'Etc/GMT-2',
      },
      logging: true,
    }
  );
} else {
  sequelize = new Sequelize('pokedex', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
      timezone: 'Etc/GMT-2',
    },
    logging: false,
  });
}

const Pokemon = PokemonModel(sequelize, DataTypes);
const User = UserModel(sequelize, DataTypes);
const options =
  process.env.NODE_ENV == 'production' ? undefined : { force: true };
const initDb = () => {
  return sequelize.sync(options).then((_) => {
    console.log(process.env);
    if (process.env.NODE_ENV === 'development') {
      pokemons.map((pokemon) => {
        Pokemon.create(
          {
            name: pokemon.name,
            hp: pokemon.hp,
            cp: pokemon.cp,
            picture: pokemon.picture,
            types: pokemon.types,
          },
          { ignoreDuplicates: true }
        );
      });
      bcrypt
      .hash('pikachu', 10)
      .then((hash) =>
        User.create({
          username: 'pikachu',
          password: hash,
        })
      )
      .then((user) => console.log(user.toJSON()));
    }
    console.log('La base de donnée a bien été initialisée !');
  });
};

module.exports = {
  initDb,
  Pokemon,
  User,
};
