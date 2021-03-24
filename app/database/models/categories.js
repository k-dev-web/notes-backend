'use strict'
module.exports = function (sequelize, DataTypes) {
    const Categories = sequelize.define('Categories', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'categories',
        classMethods: {}
    });


    return Categories;
};
