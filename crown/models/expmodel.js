const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const exp = sequelize.define('expCounts', {
        id: {
            type: DataTypes.TEXT,
            autoincrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        expCount: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return exp

};