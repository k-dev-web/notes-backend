'use strict'



module.exports = function(sequelize, DataTypes) {
    const Notes = sequelize.define('Notes', {
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
        category_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'categories',
                key: 'id'
            }

        },
        description: {
            type: DataTypes.STRING,
            allowNull: true
        },
        time_stamp:{
            type: DataTypes.DATE
        }


    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'notes',
        classMethods: {
            associate: function (models) {
            //    Notes.hasOne(models.Categories, {foreignKey: 'id'})

            }
            }
    });

    Notes.associate = function(models) {
        Notes.belongsTo(models['Categories'], {foreignKey: 'category_id'})
    }
    return Notes;
};
