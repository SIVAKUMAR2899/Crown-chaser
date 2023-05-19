var mysql = require('mysql');

module.exports = {
    HOST :"sql12.freesqldatabase.com",
    DB:"sql12619239",
    USER:"sql12619239",
    PASSWORD:"fbyui65K9x",
    Port:"3306",
    dialect:"mysql",
    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
};
