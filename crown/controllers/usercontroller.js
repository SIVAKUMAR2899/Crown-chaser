const { users } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const Player = db.users;
const Crowns = db.crownCounts;
const Exp = db.expCounts;
const CardDetail = db.cardDetails;
const Crowncoin = db.crownCoins;
const Cpg = db.cpgs;

//1.post method

const addUser = async (req, res) => {
    const salt = genSaltSync(10);
    const body = req.body;
    body.password = hashSync(req.body.password, salt);
    //  console.log(body.password);
    const users = await Player.create(body);
    if (users) {
        res.status(200).json({
            code: res.statusCode,
            data: users,
            message: 'user saved successfully'
        });
    } else {
        return res.json({
            status: 0,
            message: "user doesn't saved"
        });
    }
}

//2.get all users

const getAllUser = async (req, res) => {
    let users = await Player.findAll({ Player });
    if (users) {
        res.status(200).send(users);
    } else {
        return res.json({
            status: 0,
            message: "User doesn't return successfully"
        })
    }
}

//3.get by id

const getOneUser = async (req, res) => {
    let user_id = req.params.user_id
    let users = await Player.findOne({
        include: [{
            model: Crowns,
            as: 'crown'
        }, {
            model: Crowncoin,
            as: 'crowncoin'
        }, {
            model: Exp,
            as: 'exp'
        }, {
            model: Cpg,
            as: 'cpg'
        }, {
            model: CardDetail,
            as: 'carddetail'
        }],
        where: { user_id: user_id }
    });
    if (users) {
        return res.status(200).json({
            data: users
        });
    } else {
        return res.json({
            status: 0,
            message: "User is invalid"
        });
    }
}

//4.edit profile method

const updateUser = async (req, res) => {
    let user_id = req.params.user_id
    const users = await Player.update(req.body, { where: { user_id: user_id } });
    if (users) {
        res.status(200).json({
            data: users,
            code: res.statusCode,
            message: 'User update success'
        });
    } else {
        return res.json({
            status: 0,
            message: "User update failed"
        });
    }
}

//5.delete method

const deleteUser = async (req, res) => {
    let user_id = req.params.user_id
    await users.destroy({ where: { user_id: user_id } })
    res.status(200).json({
        code: res.statusCode,
        data: users,
        message: 'Deleted successfully'
    })
}

//6.crowncount
const crowncount = async (req, res) => {
    const { user_id, crowncount } = req.body;
    const crown = await Player.update({ crowncount: crowncount }, { where: { user_id: user_id } });
    if (crown) {
        res.status(200).json({
            data: crown,
            code: res.statusCode,
            message: 'Crown update success'
        });
    } else {
        return res.json({
            status: 0,
            message: "Crown update failed"
        });
    }
}

// 7.Leaderboard

const leaderboard = async (req, res) => {
    let leader = await Crowns.findAll({ Crowns });

    var total = [];
    var largest = leader.sort((a, b) => a.crowncount - b.crowncount);
    largest.reverse();

    for (var i = 0; i < largest.length; i++) {

        let userid = largest[i].user_id;
        let crownvalue = largest[i].crowncount;

        var lead = await Player.findOne({ where: { user_id: userid } });

        const userObj = new Object();
        userObj.name = lead.name;
        userObj.id = userid;
        userObj.crownValue = crownvalue;

        total.push(userObj);
    }
    console.log(total)

    return res.json({
        status: 1,
        message: total
    })
}
module.exports = {
    addUser,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser,
    crowncount,
    leaderboard
};