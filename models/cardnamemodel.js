const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Card = sequelize.define('cardnames', {
        card_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        cardname: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: false
    }
);

return Card

};


