const { crownCoins } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const CrownCoin = db.crownCoins;
var short_id = require('shortid');

const addCrownCoin = async (req, res) => {

    var shortid =short_id.generate();
    
    var userid = req.body.user_id;
    var crowncoinone = await CrownCoin.findOne({ where: { user_id: userid } });
    // console.log(crowncoinone);
    
    if(!crowncoinone){
        let Crowncoins =await CrownCoin.create({id:shortid,user_id:req.body.user_id,CrownCoins:req.body.CrownCoins});
        if(Crowncoins){
            return res.json({
            code: res.statusCode,
            data: Crowncoins,
            message: 'CrownCoin saved successfully'
            });
        }else{
            return res.json({
            status:0,
            message:"CrownCoin doesn't saved"
            });
        }
    }else{
        return res.json({
            status : 0,
            message : "This userid is already have"
        })
    } 
}

const updateCrownCoin = async (req, res) => {
    let user_id = req.body.user_id;
        const Crowncoins = await CrownCoin.update(req.body, { where: { user_id: user_id } });
        if(Crowncoins){
            res.status(200).json({
            data: Crowncoins,
            code: res.statusCode,
            message: 'CrownCoin update success'
            });
        }else{
            return res.json({
            status:0,
            message:"CrownCoin update failed"
            });
        }
}

module.exports = {
    addCrownCoin,
    updateCrownCoin
};