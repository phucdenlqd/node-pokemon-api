const VALID_TYPES = [
  'Plante',
  'Poison',
  'Feu',
  'Eau',
  'Insecte',
  'Vol',
  'Normal',
  'Electrik',
  'Fée',
];

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'Pokemon',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: 'Le nom est deja pris',
        },
        validate: {
          notEmpty: { msg: 'Le nom ne peut pas etre vide' },
          notNull: { msg: 'Le nom est une propriete require.' },
        },
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Utilisez uniquement des nombres entiers pour les points de vie.',
          },
          max: {
            args: [999],
            msg: 'Les points de vie doient etre inferieurs ou egales a 999',
          },
          min: {
            args: [0],
            msg: 'Les points de vie doient etre superieurs ou egales a 0',
          },
          notNull: { msg: 'Les points de vie sont une propriete require.' },
        },
      },
      cp: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          isInt: {
            msg: 'Utilisez uniquement des nombres entiers pour les points de degats.',
          },
          max: {
            args: [99],
            msg: 'Les points de degats doient etre inferieur ou egale a 999',
          },
          min: {
            args: [0],
            msg: 'Les points de degats doient etre superieurs ou egales a 0',
          },
          notNull: { msg: 'Les points de degats sont une propriete require.' },
        },
      },
      picture: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isUrl: { msg: 'Utilisez uniquement une URL pour image' },
          notNull: { msg: 'images est une propriete require.' },
        },
      },
      types: {
        type: DataTypes.STRING,
        allowNull: false,
        get() {
          return this.getDataValue('types').split(',');
        },
        set(types) {
          this.setDataValue('types', types.join());
        },
        validate: {
          isTypesValid(value) {
            if (!value) {
              throw new Error('Un pokemon doit au moins avoir un type.');
            }
            if (value.split(',').length > 3) {
              throw new Error('Un pokemon ne peut pas avoir plus de 3 types');
            }
            if (!value.split(',').every((type) => VALID_TYPES.includes(type))) {
              throw new Error('Au moins un des types n est pas valid');
            }
          },
        },
      },
    },
    {
      timestamps: true,
      createdAt: 'created',
      updatedAt: false,
    }
  );
};
