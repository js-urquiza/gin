module.exports = function (sequelize, dataTypes) {
  let alias = "Tenants";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: dataTypes.STRING,
      allowNull: false,
    },
    category: {
      type: dataTypes.STRING,
    },
    name: {
      type: dataTypes.STRING,
    },
    lastName: {
      type: dataTypes.STRING,
    },
    birthDate: {
      type: dataTypes.DATE,
    },
    profilePhoto: {
      type: dataTypes.STRING,
    },
    adress: {
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
    phone: {
      type: dataTypes.STRING,
    },
    whatsapp: {
      type: dataTypes.STRING,
    },
  };
  let config = {
    tableName: "tenants",
    timestamps: true,
    paranoid: true,
  };

  const Tenant = sequelize.define(alias, cols, config);

  Tenant.associate = function (models) {
    
    Tenant.belongsTo(models.Landlords, {
      foreignKey: "landlordId",
      as: "landlord",
    });

    Tenant.hasMany(models.Contracts, {
      foreignKey: 'tenantId',
      as: 'contracts'
    })

  };

  return Tenant;
};
