const { cpgs } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const Cpg = db.cpgs;
var short_id = require('shortid');

const addCpg = async (req, res) => {
    var shortid =short_id.generate();
    
    var userid = req.body.user_id;
    var cpgone = await Cpg.findOne({ where: { user_id: userid } });
    // console.log(cpgone);
    
    if(!cpgone){
        let Cpgs =await Cpg.create({id:shortid,user_id:req.body.user_id,cpg:req.body.cpg});
    if(Cpgs){
        res.status(200).json({
            code: res.statusCode,
            data: Cpgs,
            message: 'Cpg saved successfully'
        });
    }else{
        return res.json({
            status:0,
            message:"Cpg doesn't saved"
        });
    }
    }else{
        return res.json({
            status : 0,
            message : "This userid is already have"
        })
    } 
}

const updateCpg = async (req, res) => {
    let user_id = req.body.user_id;
        const Cpgs = await Cpg.update(req.body, { where: { user_id: user_id } });
        if(Cpgs){
            res.status(200).json({
            data: Cpgs,
            code: res.statusCode,
            message: 'Cpg update success'
            });
        }else{
            return res.json({
            status:0,
            message:"Cpg update failed"
            });
        }
}

module.exports = {
    addCpg,
    updateCpg
};