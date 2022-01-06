import { Sequelize, SequelizeOptions } from 'sequelize-typescript';

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'admin',
  database: 'RPS',
  dialect: 'postgres'
};

export const sequelize = new Sequelize(sequelizeOptions);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}