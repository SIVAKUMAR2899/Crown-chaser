const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Carddetail = sequelize.define('cardDetails', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        card_id: {
            type: DataTypes.INTEGER,
        },
        cardexp: {
            type: DataTypes.INTEGER,
        },
        cardlevel: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return Carddetail

};