const UserService = require('../services/user.services');
const UserModel = require('../model/user.model');
const multer = require("multer");

const imagekit = require("imagekit");
exports.register = async (req, res, next) => {
    try {
        const { phone } = req.body;
        const successRes = await UserService.registerUser(phone);
        // console.log(successRes);
        // res.json({ status: true, success: `user Registered succesfully ${phone}`, otp: `${successRes}` });
        return res.status(200).send({
            status: true, success: `user Registered succesfully ${phone}`, otp: `${successRes['otp']}`, hashk: `${successRes['hash']}`
        });
    } catch (error) {
        throw error
    }
}

// exports.otpLogin = (req, res, next) => {
//     UserService.createOtp(req.body, (error, results) => {
//         if (error) {
//             return next(error);
//         }
//         return res.status(200).send({
//             status: true,
//             message: results,
//         });
//     });
// };

exports.verifyOTP = (req, res, next) => {
    UserService.verifyOTP(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            status: true,
            message: results,
        });
    })
}

exports.addName = (req, res, next) => {
    UserService.addname(req.body, (error, results) => {
        if (error) {
            return next(error);
        }
        return res.status(200).send({
            message: "Success",
            data: results,
        });
    })
}

exports.FindUser = async (req, res, next) => {
    try {
        console.log("in controller finduser try block");
        // const successRes = await UserService.registerUser(phone);
        const successRes = await UserService.FindUser(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}

exports.registreHospital = async (req, res, next) => {
    try {
        const successRes = await UserService.registerHospital(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}

exports.FindHospital = async (req, res, next) => {
    try {
        const successRes = await UserService.findHospital(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}

exports.VerifyMobile = async (req, res, next) => {
    try {
        const successRes = await UserService.verifyMobile(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}


exports.VerifyMobile = async (req, res, next) => {
    try {
        const successRes = await UserService.verifyMobile(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}

exports.VerifyMail = async (req, res, next) => {
    try {
        const successRes = await UserService.verifyMail(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}


exports.addBasicDetails = async (req, res, next) => {
    try {
        const successRes = await UserService.hospitalBasicDetail(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}


exports.addGovtDetails = async (req, res, next) => {
    try {
        const successRes = await UserService.hospitalGovernmenttDetails(req.body);
        return res.status(200).send({
            status: true,
            message: "Success",
            data: successRes,
        });
    }
    catch (error) {
        throw error
    }
}


exports.genData = async  (req,res) => {
    const _id = req.params.id ;
    console.log("Inside");
    const {age, height, weight, bp, sugar} = req.body ;
    console.log(age,height,weight,bp,sugar,_id);
    try {
        if(_id){
           await UserModel.updateOne({_id},{
                $set:{
                    'gen_data.age' : age,
                    'gen_data.height' : height,
                    'gen_data.weight' : weight,
                    'gen_data.bp' : bp,
                    'gen_data.sugar' : sugar,
                }
            });
            res.json({success:true});
        }
        else{
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        throw error
    }
}
const storageEngine = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./uploads"); // Set the destination path
    }, // path
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });
const imagekitClient = new imagekit({
    publicKey: "public_1v21XIs7OCce6guYOGwwdBVcOEs=",
    privateKey: "private_5fAx7bo8su30PKwo+V9Wwf8IMbE=",
  
    urlEndpoint: "https://ik.imagekit.io/blacksp/",
  });

exports.upload = multer({
    storage: storageEngine,
  });


exports.addReport = async (req, res) => {
    if (req.files) {
      const {id} = req.params.id ;
      const {title, date } = req.body;
      
      
      const {reportpdf} = req.files;
      
      try {
   
  
        const file1 = fs.readFileSync(reportpdf[0].path);
        
        const base1 = file1.toString("base64");
       
        const FileUplaodResult = await imagekitClient.upload({
          file: base1,
          fileName: reportpdf[0].originalname,
        });
  
        // Upload Image 2 to ImageKit
      
        await UserModel.findOneAndUpdate({_id : id},{
            $push:{
                reports:{
                    title,
                    date,
                    fileURL:FileUplaodResult.url
                },
               
            }
            
        },
        { new: true })
        res.status(200).send({ success: true });
      } catch (error) {
        console.log(error);
      }
    } else {
      res.status(400).send("INVALID");
    }
  };
  

exports.fetchUser = async(req,res) => { 
    const id = req.params.id ;
try{
    if(id){
        const user = await UserModel.find({_id:id});
        res.status(200).send(user);
    }
    else{
        res.status(400).json({success:false});
    }
}catch(err){
    console.log(error);
}
}