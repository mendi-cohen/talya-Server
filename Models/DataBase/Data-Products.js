import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";

const Product = sequelize.define('Product', {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  export default Product