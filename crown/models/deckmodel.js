const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Decks = sequelize.define('decks', {

        id: {
            type: DataTypes.TEXT,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER
        },
        deck_1: {
            type: DataTypes.JSON,
        },
        deck_2: {
            type: DataTypes.JSON,
        },
        deck_3: {
            type: DataTypes.JSON,
        },
        deck_4: {
            type: DataTypes.JSON,
        },
        deck_5: {
            type: DataTypes.JSON,
        }
    },
    {
        timestamps: false
    }
);

return Decks

};


