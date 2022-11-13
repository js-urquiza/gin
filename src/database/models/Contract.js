module.exports = function (sequelize, dataTypes) {
  let alias = "Contracts";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: dataTypes.STRING,
    },
    startDate: {
      type: dataTypes.DATE,
    },
    endDate: {
      type: dataTypes.DATE,
    },
    paymentDueDay: {
      type: dataTypes.TINYINT,
    },
    duration: {
      type: dataTypes.TINYINT,
    },
    initialPrice: {
      type: dataTypes.DECIMAL(10, 2),
    },
    paymentMethod: {
      type: dataTypes.STRING,
    },
    gracePeriod: {
      type: dataTypes.TINYINT,
    },
    dailyLateFee: {
      type: dataTypes.DECIMAL,
    },
    file: {
      type: dataTypes.STRING,
    },
    handled: {
      type: dataTypes.TINYINT,
    },
  };
  let config = {
    tableName: "contracts",
    timestamps: true,
    paranoid: true,
  };

  const Contracts = sequelize.define(alias, cols, config);

  Contracts.associate = function (models) {
    
    Contracts.belongsTo(models.Landlords, {
      foreignKey: "landlordId",
      as: "landlord",
    });

    Contracts.belongsTo(models.Tenants, {
      foreignKey: 'tenantId',
      as: 'tenant'
    });

    Contracts.belongsTo(models.Properties, {
      foreignKey: 'propertyId',
      as: 'property'
    });

    Contracts.hasMany(models.Rents, {
      foreignKey: 'contractId',
      as: 'rents'
    });

    Contracts.hasMany(models.Expenses, {
      foreignKey: "contractId",
      as: "expenses",
    });

  };

  return Contracts;
};
