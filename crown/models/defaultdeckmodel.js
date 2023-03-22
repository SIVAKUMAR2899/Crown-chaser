const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Defaultdeck = sequelize.define('defaultdecks', {
        id: {
            type: DataTypes.TEXT,
            autoincrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        deckid: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return Defaultdeck

};


