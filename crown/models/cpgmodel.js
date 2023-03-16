const dbconfig = require('../config/dbconfig');

module.exports = (sequelize, DataTypes) => {
    const Cpg = sequelize.define('cpgs', {
        id: {
            type: DataTypes.TEXT,
            autoincrement: true,
            primaryKey: true
        },
        user_id: {
            type: DataTypes.INTEGER,
        },
        cpg: {
            type: DataTypes.INTEGER,
        }
    },
    {
        timestamps: false
    }
);

return Cpg

};


