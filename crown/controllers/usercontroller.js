const { users } = require('../models');
const { cardnames } = require('../models');
const { decks } = require('../models');
const { defaultdecks } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const { hashSync, genSaltSync, compareSync } = require('bcrypt');
const Player = db.users;
const Deckss = db.decks;
const Defaultdeck = db.defaultdecks;
const Crowns = db.crownCounts;
const Exp = db.expCounts;
const Cardname = db.cardnames;
const CardDetail = db.cardDetails;
const Crowncoin = db.crownCoins;
const Cpg = db.cpgs;
var short_id = require('shortid');

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
    var uname = await Player.findOne({ where: { email: req.body.email } });
    var uuid = uname.user_id
    console.log(uuid);

    var deck =[];
    for (random = 1; random < 9; random++) {
        var num = random;
        console.log(num);

        var cname = await Cardname.findOne({ where: { card_id: num } });
        const userObj = new Object();
        userObj.Cardname = cname.cardname;
        userObj.Level = 1;
        
        deck.push(userObj);
    }
    console.log(deck);

    var shortid =short_id.generate();
    let deckfile =await Deckss.create({id:shortid,user_id:uuid,deck_1:deck,deck_2:deck,deck_3:deck,deck_4:deck,deck_5:deck});

    let defaults =  0;
    console.log(defaults);
    let dedeck =await Defaultdeck.create({id:shortid,user_id:uuid,deckid:defaults});
    console.log(dedeck);

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
    let user_id = req.body.user_id;
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
    let user_id = req.body.user_id
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
    let user_id = req.body.user_id
    await Deckss.destroy({ where: { user_id: user_id } })
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

// 8.Cardname

const getCardName = async (req, res) => {
    let CardName = await Cardname.findAll({ Cardname });
    // console.log(CardName);
    if (CardName) {
        return res.json({
            status: 1,
            data :CardName
        })
    } else {
        return res.json({
            status: 0,
            message: "User doesn't return successfully"
        })
    }
}

// 9.getdeck

const getdeck = async (req, res) => {
    let userid = req.body.user_id;
    let Alldeck = await Deckss.findOne({ where: {user_id : userid}});
    console.log(Alldeck.deck_1);
    if (Alldeck) {
        return res.json({
            status: 1,
            data :  [{"Cards":[Alldeck.deck_1],"Name":"Trail 0"},{"Cards":[Alldeck.deck_2],"Name":"Trail 1"},{"Cards":[Alldeck.deck_3],"Name":"Trail 2"},{"Cards":[Alldeck.deck_4],"Name":"Trail 3"},{"Cards":[Alldeck.deck_5],"Name":"Trail 4"}]
        })
    } else {
        return res.json({
            status: 0,
            message: "Deck doesn't return successfully"
        })
    }
}                                                  

// 10.Update Deck

const updatedeck = async (req, res) => {
    let user_id = req.body.user_id
    const users = await Deckss.update(req.body, { where: { user_id: user_id } });
    if (users) {
        res.status(200).json({
            data: users,
            code: res.statusCode,
            message: 'Deck update success'
        });
    } else {
        return res.json({
            status: 0,
            message: "Deck update failed"
        });
    }
}

// 11.Update defaultdeck

const updatedefaultdeck = async (req, res) => {
    let user_id = req.body.user_id
    const users = await Defaultdeck.update(req.body, { where: { user_id: user_id } });
    console.log(users)
    if (users) {
        res.status(200).json({
            data: users,
            code: res.statusCode,
            message: 'Defaultdeck update success'
        });
    } else {
        return res.json({
            status: 0,
            message: "Defaultdeck update failed"
        });
    }
}

module.exports = {
    addUser,
    getAllUser,
    getOneUser,
    updateUser,
    deleteUser,
    crowncount,
    leaderboard,
    getCardName,
    getdeck,
    updatedeck,
    updatedefaultdeck
};