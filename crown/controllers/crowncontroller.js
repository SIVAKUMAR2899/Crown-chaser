const { crownCounts } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const Crown = db.crownCounts;
var short_id = require('shortid');

const addCrown = async (req, res) => {
    var shortid =short_id.generate();
    
    var userid = req.body.user_id;
    var crownone = await Crown.findOne({ where: { user_id: userid } });
    // console.log(crownone);

    if(!crownone){
        let crowns =await Crown.create({id:shortid,user_id:req.body.user_id,crowncount:req.body.crowncount});
        if(crowns){
            res.status(200).json({
                code: res.statusCode,
                data: crowns,
                message: 'Crown saved successfully'
            });
        }else{
            return res.json({
                status:0,
                message:"Crown doesn't saved"
            });
        }
    }else{
        return res.json({
            status : 0,
            message : "This userid is already have"
        })
    }   
}

const updateCrown = async (req, res) => {
    let user_id = req.body.user_id;
        const Crowns = await Crown.update(req.body, { where: { user_id: user_id } });
        if(Crowns){
            res.status(200).json({
            data: Crowns,
            code: res.statusCode,
            message: 'Crown update success'
            });
        }else{
            return res.json({
            status:0,
            message:"Crown update failed"
            });
        }
}


module.exports = {
    addCrown,
    updateCrown,
    // leaderboard
};