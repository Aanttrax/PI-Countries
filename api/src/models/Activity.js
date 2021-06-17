const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('activity', {

        name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        dificulty: {
            type: DataTypes.ENUM(['1','2','3','4','5']),
            allowNull: true
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: true
        }
    });
}