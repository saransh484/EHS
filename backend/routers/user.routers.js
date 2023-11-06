const router = require('express').Router();
const { UserContextImpl } = require('twilio/lib/rest/conversations/v1/user');
const UserController = require('../controller/user.controller');

router.post('/registration', UserController.register);
// router.post('/otpLogin', UserController.otpLogin);
router.post('/verifyOTP', UserController.verifyOTP);
router.put('/addname', UserController.addName);
router.post('/findUser', UserController.FindUser);
router.get('/getUserDetails/:phone', UserController.GetUserDetails);
router.post('/hospitalRegister', UserController.registreHospital);
router.post('/findHospital', UserController.FindHospital);
router.post('/verifyMobile', UserController.VerifyMobile);
router.post('/verifyMail', UserController.VerifyMail);
router.put('/addHospitalBasicDetails', UserController.addBasicDetails);
router.put('/addHospitalGovtDetails', UserController.addGovtDetails);
router.put("/gendata/:id", UserController.genData);
router.post(
  "/addReport/:id",
  UserController.upload.fields([{ name: "reportpdf" }]),
  UserController.addReport
);
router.get("/fetchUser/:id", UserController.fetchUser);
router.post("/postCamp/:id", UserController.postCamp);
router.put('/genIdPwd', UserController.genIdPwd);
router.put('/hospitalLogin', UserController.hospitalLogin);
router.get('/fetchhospitals', UserController.allHospital);
router.get('/showAllHospital', UserController.showAllHospital);
router.post('/bookAppointment', UserController.bookAppointment);
router.get('/fetchappointment/:id', UserController.getAppointment);
router.get('/userfetchappointment/:id', UserController.getUserAppointment);
router.get('/getCamps/:pin', UserController.getCamps);
router.post('/postAppointment/:id', UserController.postAppointment);

//   "/addReport/:id",
//   UserController.upload.fields([{ name: "reportpdf" }]),
//   UserController.addReport
// );

router.get("/fetchUser/:id", UserController.fetchUser);
router.post("/postCamp/:id", UserController.postCamp);
router.post("/addDoc/:id", UserController.addDoc);
router.post("/loginDoc", UserController.loginDoc);

router.get("/fetchUHID/:id", UserController.getUHID);

module.exports = router;  