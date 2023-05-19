const Usercontroller = require('../controllers/usercontroller');
const Crowncontroller = require('../controllers/crowncontroller');
const Expcontroller = require('../controllers/expcontroller');
const Carddetcontroller = require('../controllers/carddetailcontroller');
const Crowncoincontroller = require('../controllers/crowncoincontroller');
const Cpgcontroller = require('../controllers/cpgcontroller');

const router = require('express').Router()

router.get('/leaderboard',Usercontroller.leaderboard)

router.get('/deck',Usercontroller.getdeck)

router.put('/updatedeck',Usercontroller.updatedeck)

router.put('/updatedefaultdeck',Usercontroller.updatedefaultdeck)

router.post('/adduser',Usercontroller.addUser)

router.post('/login',Usercontroller.login)

router.get('/cardname',Usercontroller.getCardName)

router.get('/alluser',Usercontroller.getAllUser)

router.get('/user',Usercontroller.getOneUser)

router.put('/updateuser',Usercontroller.updateUser)

router.delete('/deleteuser',Usercontroller.deleteUser)

router.post('/addcrown',Crowncontroller.addCrown)

router.put('/updatecrown',Crowncontroller.updateCrown)

router.post('/addcrowncoin',Crowncoincontroller.addCrownCoin)

router.put('/updatecrowncoin',Crowncoincontroller.updateCrownCoin)

router.post('/addcpg',Cpgcontroller.addCpg)

router.put('/updatecpg',Cpgcontroller.updateCpg)

router.post('/addexp',Expcontroller.addExp)

router.put('/updateexp',Expcontroller.updateExp)

router.post('/addcdet',Carddetcontroller.addCarddet)

router.put('/updatecarddet',Carddetcontroller.updateCarddet)


module.exports = router;