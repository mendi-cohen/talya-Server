import { DataTypes } from 'sequelize';
import sequelize from "../../Config/DB.js";

const Product = sequelize.define('Product', {
  name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      
    },
    // image: {
    //   type: DataTypes.BLOB('long'),
    //   allowNull: true
    // },
    image: {
      type: DataTypes.BYTEA,
      allowNull: true
    },
    imageType: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });

  export default Product