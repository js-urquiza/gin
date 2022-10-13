module.exports = function (sequelize, dataTypes) {
  let alias = "Landlords";
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
      allowNull: false,
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
    }
  };
  let config = {
    tableName: "landlords",
    timestamps: true,
    paranoid: true,
  };

  const Landlord = sequelize.define(alias, cols, config);

  Landlord.associate = function(models) {
    
    Landlord.belongsTo(models.Users, {
        foreignKey: 'userId',
        as: 'user'
    });

    Landlord.hasMany(models.Contracts, {
      foreignKey: 'landlordId',
      as: 'landlord'
    })
  }

  return Landlord;
};
