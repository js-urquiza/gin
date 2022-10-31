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
      allowNull: false,
    },
    startDate: {
      type: dataTypes.DATE,
    },
    endDate: {
      type: dataTypes.DATE,
    },
    duration: {
      type: dataTypes.TINYINT,
    },
    initialPrice: {
      type: dataTypes.DECIMAL(10,2),
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
    }
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
  };

  return Contracts;
};
