// const sequelize = require('sequelize');
const dbconfig = require('../config/dbconfig');

const {Sequelize,DataTypes} = require('sequelize');

const sequelize = new Sequelize(
    dbconfig.DB,
    dbconfig.USER,
    dbconfig.PASSWORD,{
        host: dbconfig.HOST,
        dialect: dbconfig.dialect,
        port:dbconfig.Port
    }
)

sequelize.authenticate()
.then(()=>{
    console.log('connected..')
})
.catch(err => {
    console.log('Error'+ err)
})

const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.users = require('./usermodel')(sequelize, DataTypes)
db.decks = require('./deckmodel')(sequelize, DataTypes)
db.defaultdecks = require('./defaultdeckmodel')(sequelize, DataTypes)
db.crownCounts = require('./crownmodel')(sequelize, DataTypes)
db.expCounts = require('./expmodel')(sequelize, DataTypes)
db.cardnames = require('./cardnamemodel')(sequelize, DataTypes)
db.cardDetails = require('./carddetailmodel')(sequelize, DataTypes)
db.crownCoins = require('./crowncoinmodel')(sequelize, DataTypes)
db.cpgs = require('./cpgmodel')(sequelize, DataTypes)

db.sequelize.sync({ force: false })
.then(() => {
    console.log('yes re-sync done!')
})

db.users.hasMany(db.crownCounts, {
    foreignKey: 'user_id',
    as: 'crown'
})
db.users.hasMany(db.expCounts, {
    foreignKey: 'user_id',
    as: 'exp'
})
db.users.hasMany(db.cardDetails, {
    foreignKey: 'user_id',
    as: 'carddetail'
})
db.users.hasMany(db.crownCoins, {
    foreignKey: 'user_id',
    as: 'crowncoin'
})
db.users.hasMany(db.cpgs, {
    foreignKey: 'user_id',
    as: 'cpg'
})

module.exports = db;