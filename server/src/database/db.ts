import { Sequelize } from "sequelize";

if (!process.env.DB_NAME) {
  throw new Error("DB_NAME environment variable is required");
}
if (!process.env.DB_USER) {
  throw new Error("DB_USER environment variable is required");
}
if (!process.env.DB_PASSWORD) {
  throw new Error("DB_PASSWORD environment variable is required");
}
if (!process.env.DB_HOST) {
  throw new Error("DB_HOST environment variable is required");
}
if (!process.env.DB_PORT) {
  throw new Error("DB_PORT environment variable is required");
}

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "postgres",
    logging: process.env.NODE_ENV === "development" ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

export { sequelize };
export default sequelize;
