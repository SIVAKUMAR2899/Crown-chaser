const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Crown = sequelize.define('crownCounts', {
        id: {
            type: DataTypes.TEXT,
            autoincrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        crowncount: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return Crown

};