const { cardDetails } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const CardDetail = db.cardDetails;
var short_id = require('shortid');

const addCarddet = async (req, res) => {
    var shortid =short_id.generate();

    const body = req.body;
    body.id = shortid;
    const cards = await CardDetail.create(body);
    if(cards){
        res.status(200).json({
            code: res.statusCode,
            data: cards,
            message: 'CardDetail saved successfully'
        });
    }else{
        return res.json({
            status:0,
            message:"CardDetail doesn't saved"
        });
    }
}

const updateCarddet= async (req, res) => {
    let {user_id,card_id }= req.body;
    const cards = await CardDetail.update(req.body, { where: { user_id: user_id,card_id: card_id } });
    if(cards){
        res.status(200).json({
        data: cards,
        code: res.statusCode,
        message: 'CardDetail update success'
        });
    }else{
        return res.json({
        status:0,
        message:"CardDetail update failed"
        });
    }
}


module.exports = {
    addCarddet,
    updateCarddet
};