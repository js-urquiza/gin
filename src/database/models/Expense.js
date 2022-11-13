module.exports = function (sequelize, dataTypes) {
  let alias = "Expenses";
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
    dueDate: {
      type: dataTypes.DATE,
    },
    amount: {
      type: dataTypes.DECIMAL(10, 2),
    },
    coeff: {
      type: dataTypes.DECIMAL(10, 2),
    }
  };
  let config = {
    tableName: "expenses",
    timestamps: true,
    paranoid: true,
  };

  const Expenses = sequelize.define(alias, cols, config);

  Expenses.associate = function (models) {
    
    Expenses.belongsTo(models.Contracts, {
      foreignKey: "contractId",
      as: "contract",
    });

  };

  return Expenses;
};
