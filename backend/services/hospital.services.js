const UserModel = require('../model/user.model');
const HospitalModel = require('../model/hospital.model');
const AppointmentModel = require('../model/hospital.model');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = 'otp-secret-key';
const twilio = require('twilio');
const request = require('request');
const http = require('https');

const { type } = require('os');

async function registerHospital(params, callback) {
    const { mail, mobile } = params;

    const otp = otpGenerator.generate(4, {
        digits: true,
        // alphabets: false,    
        // upperCase: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
    const ttl = 10 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${mobile}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    console.log(`your otp is ${otp}`);

    //------------mail otp
    const mailotp = otpGenerator.generate(4, {
        digits: true,
        // alphabets: false,    
        // upperCase: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    }); mail
    const mailttl = 10 * 60 * 1000;
    const mailexpires = Date.now() + mailttl;
    const maildata = `${mail}.${mailotp}.${mailexpires}`;
    const mailhash = crypto.createHmac("sha256", key).update(maildata).digest("hex");
    const mailfullHash = `${mailhash}.${mailexpires}`;
    console.log(`your otp is ${mailotp}`);
    gendata = {
        "mailhash": mailfullHash,
        "mobileHash": fullHash
    }
    try {
        console.log
            (mail);
        console.log
            (gendata);
        // Find the user document by phone number and update the specified key-value pair
        const createHospital = new HospitalModel({
            mail, mobile, ['mailHash']: mailfullHash, ['mobileHash']: fullHash
        });
        console.log("create user HospitalModel ----");
        console.log(createHospital);
        const ret = await createHospital.save();
        console.log("before" + ret);
        ret['mobileotp'] = otp;
        ret['mailotp'] = mailotp;
        console.log("after" + ret);
        return ret;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function findHospital(params, callback) {
    try {
        const { mail, phone } = params;
        if (!mail) {
            throw new Error("MAIL NUMBER REQUIRED");
        }
        const existuser = await HospitalModel.findOne(
            { mail },
        );
        console.log(existuser);
        if (existuser) {
            return "HospitalExist";
        }
        else {
            return "HospitalDoesNotExist";
        }
    } catch (err) {
        throw err;
    }
}

async function verifyMobile(params, callback) {
    const { mobile, otp } = params;
    const existuser = await HospitalModel.findOne(
        { mobile },
    );
    console.log(existuser);
    if (existuser) {
        const hash = existuser["mobileHash"];
        let [hashValue, expires] = hash.split('.');
        let now = Date.now();
        if (now > parseInt(expires)) return "OTP Expired";
        let data = `${mobile}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
        if (newCalculatedHash === hashValue) {
            // if (true) {
            return "Success";
        }
        else {
            return "Invalid OTP";
        }
    }
    else {
        return "notfound"
    }
}

async function verifyMail(params, callback) {
    const { mail, otp } = params;
    const existuser = await HospitalModel.findOne(
        { mail },
    );
    console.log(existuser);
    if (existuser) {
        const hash = existuser["mailHash"];
        let [hashValue, expires] = hash.split('.');
        let now = Date.now();
        if (now > parseInt(expires)) return "OTP Expired";
        let data = `${mail}.${otp}.${expires}`;
        let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
        if (newCalculatedHash === hashValue) {
            // if (true) {
            return "Success";
        }
        else {
            return "Invalid OTP";
        }
    }
    else {
        return "notfound"
    }
}


async function hospitalBasicDetail(params, callback) {
    const { mail, mobile } = params;

    try {
        console.log
            (params);
        // Find the user document by phone number and update the specified key-value pair
        // const createHospital = new HospitalModel({
        //     params
        // });

        const updatedUser = await HospitalModel.findOneAndUpdate(
            { mail },
            { $set: params },
            { new: true }
        );
        console.log(
            updatedUser
        );

        if (!updatedUser) {
            console.log("User not found");
            return "User not found";
        }
        console.log("Updated User:", updatedUser);
        console.log("Key-value pair updated successfully");
        return "updated";
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}

async function hospitalGovernmenttDetails(params, callback) {
    const { mail, } = params;

    try {
        console.log
            (params);
        // Find the user document by phone number and update the specified key-value pair
        // const createHospital = new HospitalModel({
        //     params
        // });

        const updatedUser = await HospitalModel.findOneAndUpdate(
            { mail },
            { $set: params },
            { new: true }
        );
        console.log(
            updatedUser
        );

        if (!updatedUser) {
            console.log("User not found");
            return "User not found";
        }
        console.log("Updated User:", updatedUser);
        return "updated";
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}


async function generateHospitalIdPwd(params, callback) {
    const { mail } = params;

    try {
        console.log
            (params);
        // Find the user document by phone number and update the specified key-value pair
        // const createHospital = new HospitalModel({
        //     params
        // });

        const min = 1000000; // 7-digit minimum value
        const max = 9999999; // 7-digit maximum value
        const randomDigits = Math.floor(Math.random() * (max - min + 1)) + min;
        const hospital_Id = `HID${randomDigits}`;
        const randompwd = Math.floor(Math.random() * (max - min + 1)) + min;
        const pwdhash = crypto.createHmac("sha256", key).update(randompwd).digest("hex");


        const updatedUser = await HospitalModel.findOneAndUpdate(
            { mail },
            {
                $set: {
                    'hospital_login_cred.hid': hospital_Id,
                    'hospital_login_cred.pwd': randompwd
                }
            },
            { new: true }
        );
        console.log(
            updatedUser
        );

        if (!updatedUser) {
            console.log("User not found");
            return "User not found";
        }
        console.log("Updated User:", updatedUser);
        return updatedUser;
    } catch (error) {
        console.error("Error:", error);
        return false;
    }
}


async function hospitalLogin(params, callback) {
    const { hid, pwd } = params;
    // const existuser = await HospitalModel.findOne(
    //     { hospital_login_cred, hid },

    // );
    // const existuser = await HospitalModel.findOne({ 'hospital_login_cred.hid': hid });
    console.log("-----");
    const existuser = await HospitalModel.findOne({ 'hospital_login_cred.hid': String(hid) });
    console.log("-----");

    console.log(existuser);
    if (existuser) {
        const hash = existuser["hospital_login_cred"]["pwd"];
        console.log(hash);
        // let [hashValue, expires] = hash.split('.');
        // let now = Date.now();
        // if (now > parseInt(expires)) return "OTP Expired";
        // let data = `${mail}.${otp}.${expires}`;
        // let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
        if (pwd === hash) {
            // if (true) {
            return "Success";
        }
        else {
            return "Invalid pwd";
        }
    }
    else {
        return "notfound"
    }
}



async function allhospitals(params, callback) {
    try {
        const hospitals = await HospitalModel.find();
        console.log(hospitals);
        return hospitals;
    } catch (err) {
        console.error(err);
        return 'An error occurred while fetching hospitals.'
        // res.status(500).json({ error: 'An error occurred while fetching hospitals.' });
    }
}



module.exports = { registerHospital, findHospital, verifyMobile, verifyMail, hospitalBasicDetail, hospitalGovernmenttDetails, generateHospitalIdPwd, hospitalLogin, allhospitals };



