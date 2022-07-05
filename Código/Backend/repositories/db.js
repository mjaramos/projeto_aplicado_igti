import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  'postgres://dypzsoap:qC4dC0eAEs6Cj3Q5jPeZGlXINSgn7CuR@queenie.db.elephantsql.com/dypzsoap',
  {
    dialect: 'postgres',
    define: {
      timestamps: false,
    },
  }
);

export default sequelize;
