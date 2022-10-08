module.exports = function (sequelize, dataTypes) {
    let alias = 'Users';
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: dataTypes.STRING,
            allowNull: false
        },
        password: {
            type: dataTypes.STRING,
            allowNull: false
        },
        category: {
            type: dataTypes.STRING
        },
        name: {
            type: dataTypes.STRING
        },
        lastName: {
            type: dataTypes.STRING
        },
        birthDate: {
            type: dataTypes.DATE
        },
        profilPhoto: {
            type: dataTypes.STRING
        },
        adress: {
            type: dataTypes.STRING
        },
        city: {
            type: dataTypes.STRING
        },
        province: {
            type: dataTypes.STRING
        },
        postalCode: {
            type: dataTypes.STRING
        },
        phone: {
            type: dataTypes.STRING
        },
        whatsapp: {
            type: dataTypes.STRING
        },
        verified: {
            type: dataTypes.STRING
        }
    }
    let config = {
        tableName: 'users',
        timestamps: true,
        paranoid: true
    };

    const User = sequelize.define(alias, cols, config);

    return User;
}