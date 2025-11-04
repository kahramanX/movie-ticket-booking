import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database/db";

type ExampleAttributes = {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
};

class Example extends Model<ExampleAttributes> implements ExampleAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Example.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
  },
  {
    sequelize,
    tableName: "examples",
    timestamps: true,
  },
);

export default Example;
