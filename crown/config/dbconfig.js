var mysql = require('mysql');

module.exports = {
    HOST :"94.23.48.95",
    DB:"crownchaser",
    USER:"crownchaser",
    PASSWORD:"l32o1H2w_",
    Port:"3306",
    dialect:"mysql",
    pool:{
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
    
};
