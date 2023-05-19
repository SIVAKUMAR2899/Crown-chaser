const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Crowncoin = sequelize.define('crownCoins', {
        id: {
            type: DataTypes.TEXT,
            autoincrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        CrownCoins: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return Crowncoin

};


