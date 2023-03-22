const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Player = sequelize.define('users', {
        user_id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        name: {
            type: DataTypes.TEXT,
        },
        email: {
            type: DataTypes.TEXT,
        },
        password: {
            type: DataTypes.TEXT,
        }
    },
    {
        timestamps: false
    }
);

return Player

};


