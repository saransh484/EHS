const UserService = require('../services/user.services');
const HospitalService = require('../services/user.services');

const UserModel = require('../model/user.model');

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
        const successRes = await HospitalService.registerHospital(req.body);
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
        const successRes = await HospitalService.findHospital(req.body);
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
        const successRes = await HospitalService.verifyMobile(req.body);
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
        const successRes = await HospitalService.verifyMobile(req.body);
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
        const successRes = await HospitalService.verifyMail(req.body);
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
        const successRes = await HospitalService.hospitalBasicDetail(req.body);
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
        const successRes = await HospitalService.hospitalGovernmenttDetails(req.body);
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


exports.genData = async (req, res) => {
    const _id = req.params.id;
    console.log("Inside");
    const { age, height, weight, bp, sugar } = req.body;
    console.log(age, height, weight, bp, sugar, _id);
    try {
        if (_id) {
            await UserModel.updateOne({ _id }, {
                $set: {
                    'gen_data.age': age,
                    'gen_data.height': height,
                    'gen_data.weight': weight,
                    'gen_data.bp': bp,
                    'gen_data.sugar': sugar,
                }
            });
            res.json({ success: true });
        }
        else {
            return res.status(404).json({ message: "User not found" });
        }
    }
    catch (error) {
        throw error
    }
}