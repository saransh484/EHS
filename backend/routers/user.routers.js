const router = require('express').Router();
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.register);
// router.post('/otpLogin', UserController.otpLogin);
router.post('/verifyOTP', UserController.verifyOTP);
router.put('/addname', UserController.addName);
router.post('/findUser', UserController.FindUser);
router.post('/hospitalRegister', UserController.registreHospital);
router.post('/findHospital', UserController.FindHospital);
router.post('/verifyMobile', UserController.VerifyMobile);
router.post('/verifyMail', UserController.VerifyMail);
router.put('/addHospitalBasicDetails', UserController.addBasicDetails);
router.put('/addHospitalGovtDetails', UserController.addGovtDetails);
router.put("/gendata/:id", UserController.genData);
module.exports = router; 