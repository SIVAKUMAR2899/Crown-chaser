var mysql = require('mysql');

module.exports = {
    HOST :"192.84.190.235",
    DB:"recinfotceh_crownchaser",
    USER:"recinfotceh_crown",
    PASSWORD:"P$#L?P}nrfS0",
    Port:"3306",
    dialect:"mysql",

    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
};
