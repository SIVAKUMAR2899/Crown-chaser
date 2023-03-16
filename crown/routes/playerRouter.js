const Usercontroller = require('../controllers/usercontroller');
const Crowncontroller = require('../controllers/crowncontroller');
const Expcontroller = require('../controllers/expcontroller');
const Carddetcontroller = require('../controllers/carddetailcontroller');
const Crowncoincontroller = require('../controllers/crowncoincontroller');
const Cpgcontroller = require('../controllers/cpgcontroller');

const router = require('express').Router()

router.get('/leaderboard',Usercontroller.leaderboard)

router.post('/adduser',Usercontroller.addUser)

router.get('/alluser',Usercontroller.getAllUser)

router.get('/:user_id',Usercontroller.getOneUser)

router.put('/:user_id',Usercontroller.updateUser)

router.delete('/:user_id',Usercontroller.deleteUser)

router.post('/addcrown',Crowncontroller.addCrown)

router.put('/crown/:user_id',Crowncontroller.updateCrown)

router.post('/addcrowncoin',Crowncoincontroller.addCrownCoin)

router.put('/crowncoin/:user_id',Crowncoincontroller.updateCrownCoin)

router.post('/addcpg',Cpgcontroller.addCpg)

router.put('/cpg/:user_id',Cpgcontroller.updateCpg)

router.post('/addexp',Expcontroller.addExp)

router.put('/exp/:user_id',Expcontroller.updateExp)

router.post('/addcdet',Carddetcontroller.addCarddet)

router.put('/carddet/:user_id',Carddetcontroller.updateCarddet)


module.exports = router;