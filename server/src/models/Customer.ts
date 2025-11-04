import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/database/db";

class Customer extends Model {
  public id!: number;
  public email!: string;
  public name!: string;
  public createdAt!: Date;
  public updatedAt!: Date;
}

Customer.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Customer",
    tableName: "customers",
    timestamps: true,
  },
);

export { Customer };
