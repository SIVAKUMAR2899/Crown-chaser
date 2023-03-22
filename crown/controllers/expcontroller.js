const { expCounts } = require('../models');
const db = require('../models');
const { text } = require('body-parser');
const Exp = db.expCounts;
var short_id = require('shortid');

const addExp = async (req, res) => {
    var shortid = short_id.generate();

    var userid = req.body.user_id;
    var expone = await Exp.findOne({ where: { user_id: userid } });
    // console.log(expone);

    if (!expone) {
        let Exps = await Exp.create({ id: shortid, user_id: req.body.user_id, expcount: req.body.expcount });
        if (Exps) {
            res.status(200).json({
                code: res.statusCode,
                data: Exps,
                message: 'Exp saved successfully'
            });
        } else {
            return res.json({
                status: 0,
                message: "Exp doesn't saved"
            });
        }
    } else {
        return res.json({
            status: 0,
            message: "This userid is already have"
        })
    }
}

const updateExp = async (req, res) => {
    let user_id = req.body.user_id;
    const Exps = await Exp.update(req.body, { where: { user_id: user_id } });
    if (Exps) {
        res.status(200).json({
            data: Exps,
            code: res.statusCode,
            message: 'Exp update success'
        });
    } else {
        return res.json({
            status: 0,
            message: "Exp update failed"
        });
    }
}

module.exports = {
    addExp,
    updateExp
};