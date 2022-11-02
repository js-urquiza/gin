module.exports = function (sequelize, dataTypes) {
  let alias = "Rents";
  let cols = {
    id: {
      type: dataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    dueDate: {
      type: dataTypes.DATE,
    },
    amount: {
      type: dataTypes.DECIMAL(10, 2),
    }
  };
  let config = {
    tableName: "rents",
    timestamps: true,
    paranoid: true,
  };

  const Rents = sequelize.define(alias, cols, config);

  Rents.associate = function (models) {
    
    Rents.belongsTo(models.Contracts, {
      foreignKey: "contractId",
      as: "contract",
    });

  };

  return Rents;
};
