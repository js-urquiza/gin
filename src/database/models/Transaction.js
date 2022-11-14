module.exports = function (sequelize, dataTypes) {
  let alias = "Transactions";
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
    date: {
      type: dataTypes.DATE,
    },
    amount: {
      type: dataTypes.DECIMAL(10, 2),
    },
    coeff: {
      type: dataTypes.DECIMAL(10, 2),
    },
    details: {
      type: dataTypes.STRING,
    }
  };
  let config = {
    tableName: "transactions",
    timestamps: true,
    paranoid: true,
  };

  const Transactions = sequelize.define(alias, cols, config);

  Transactions.associate = function (models) {
    
    Transactions.belongsTo(models.Contracts, {
      foreignKey: "contractId",
      as: "contract",
    });

  };

  return Transactions;
};
