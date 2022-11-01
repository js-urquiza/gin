module.exports = function (sequelize, dataTypes) {
  let alias = "Properties";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    streetName: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    streetNumber: {
      type: dataTypes.STRING,
    },
    apartment: {
      type: dataTypes.STRING,
    },
    city: {
      type: dataTypes.STRING,
    },
    province: {
      type: dataTypes.STRING,
    },
    postalCode: {
      type: dataTypes.STRING,
    },
    type: {
      type: dataTypes.STRING,
    },
    propertyPhoto: {
      type: dataTypes.STRING,
    }
  };
  let config = {
    tableName: "properties",
    timestamps: true,
    paranoid: true,
  };

  const Property = sequelize.define(alias, cols, config);

  Property.associate = function (models) {
    
    Property.belongsTo(models.Landlords, {
      foreignKey: "landlordId",
      as: "landlord",
    });

    Property.hasMany(models.Contracts, {
      foreignKey: 'propertyId',
      as: 'contracts'
    });

  };

  return Property;
};
