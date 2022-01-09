import { Sequelize, SequelizeOptions } from 'sequelize-typescript';
import { UserTheme, SiteTheme } from "@/server/models";

const sequelizeOptions: SequelizeOptions = {
  host: process.env.POSTGRES_HOST,
  port: Number(process.env.POSTGRES_PORT),
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  dialect: 'postgres'
};

export const sequelize = new Sequelize(sequelizeOptions);
sequelize.addModels([UserTheme, SiteTheme]);

export async function dbConnect() {
  try {
    await sequelize.authenticate();
    await prepareDB();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

async function prepareDB() {
  await sequelize.sync();
  await SiteTheme.findOrCreate({
    where: {
      theme: 'dark',
      description: 'default theeme'
    }
  });
  await SiteTheme.findOrCreate({
    where: {
      theme: 'light'
    }
  })
}