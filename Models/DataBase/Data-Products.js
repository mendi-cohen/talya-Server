import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";

const Product = sequelize.define('Product', {
    FirstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  });

  export default Product