const UserModel = require('../model/user.model');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = 'otp-secret-key';
const twilio = require('twilio');
const request = require('request');
const http = require('https');
const HospitalModel = require('../model/hospital.model');
const { type } = require('os');


async function registerUser(phone, callback) {
    const otp = otpGenerator.generate(4, {
        digits: true,
        // alphabets: false,    
        // upperCase: false,
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false
    });
    const ttl = 5 * 60 * 1000;
    const expires = Date.now() + ttl;
    const data = `${phone}.${otp}.${expires}`;
    const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
    const fullHash = `${hash}.${expires}`;
    console.log(`your otp is ${otp}`);

    //---- SMS API -----


    // const twilioClient = new twilio('ACb8c5c87d2645b13b0d1cc04d50335125', '50aebef84667250ae31e596a43f6828f');

    // try {
    //     // Send SMS with Twilio
    //     await twilioClient.messages.create({
    //         body: `Your OTP is: ${otp}`,
    //         to: `+91${params.phone}`, 
    //         from: '+12568184991' // Twilio phone number
    //     });
    //     console.log("sms sent succesfully");

    //     return callback(null, fullHash);
    // } catch (error) {
    //     console.error(error);
    //     return callback(error, null);
    // }
    //----rapid api ---

    // const smsData = {
    //     phone_number: `+91${params.phone}`,
    //     text: `hi from gautam Your OTP is: ${otp}`
    // };

    // const options = {
    //     method: 'POST',
    //     url: 'https://rapid-sms-api.p.rapidapi.com/sms',
    //     headers: {
    //         'content-type': 'application/json',
    //         'X-RapidAPI-Key': 'dd5a1ab3admsh2ac1ed907926115p1e3b95jsn29f55ea50e82',
    //         'X-RapidAPI-Host': 'rapid-sms-api.p.rapidapi.com'
    //     },
    //     body: smsData,
    //     json: true
    // };

    // request(options, function (error, response, body) {
    //     if (error) throw new Error(error);
    //     console.log(body);
    // });

    //----SMS API END----- 

    hashk = fullHash;
    try {
        if (!phone) {
            throw new Error("PHONE NUMBER REQUIRED");
        }

        const existuser = await UserModel.findOneAndUpdate(
            { phone },
            { $set: { ["hash"]: hashk, } },
            { new: true }
        );
        console.log("updatedUsr");

        console.log(existuser);
        if (existuser == null) {
            const createUser = new UserModel({ phone, hashk });
            console.log("create user UserModel ----");
            console.log(createUser);
            const ret = await createUser.save();
            console.log(ret);
        }
        // return await createUser.save();
        const result = {
            "hash": hashk,
            "otp": otp

        };
        return await result;
    } catch (err) {
        throw err;
    }
}

async function FindUser(params, callback) {
    try {
        const { phone } = params;
        if (!phone) {
            throw new Error("PHONE NUMBER REQUIRED");
        }
        const existuser = await UserModel.findOne(
            { phone },
        );
        console.log("updatedUsr");
        console.log(existuser);
        // return await createUser.save();
        // const result = existuser;
        if (existuser) {
            return "olduser";
        }
        else {
            return "newuser";
        }

    } catch (err) {
        throw err;
    }
}

// async function createOtp(params, callback) {
//     const otp = otpGenerator.generate(4, {
//         digits: true,
//         // alphabets: false,
//         // upperCase: false,
//         upperCaseAlphabets: false,
//         lowerCaseAlphabets: false,
//         specialChars: false
//     });
//     const ttl = 5 * 60 * 1000;
//     const expires = Date.now() + ttl;
//     const data = `${params.phone}.${otp}.${expires}`;
//     const hash = crypto.createHmac("sha256", key).update(data).digest("hex");
//     const fullHash = `${hash}.${expires}`;
//     console.log(`your otp is ${otp}`);


//     //   send sms which contain otp 

//     // const twilioClient = new twilio('ACb8c5c87d2645b13b0d1cc04d50335125', '50aebef84667250ae31e596a43f6828f');

//     // try {
//     //     // Send SMS with Twilio
//     //     await twilioClient.messages.create({
//     //         body: `Your OTP is: ${otp}`,
//     //         to: `+91${params.phone}`, // Assuming params.phone contains the recipient's phone number
//     //         from: '+12568184991' // Your Twilio phone number
//     //     });
//     //     console.log("sms sent succesfully");

//     //     return callback(null, fullHash);
//     // } catch (error) {
//     //     console.error(error);
//     //     return callback(error, null);
//     // }
//     //----rapid api ---

//     const smsData = {
//         phone_number: `+91${params.phone}`,
//         text: `hi from gautam Your OTP is: ${otp}`
//     };

//     const options = {
//         method: 'POST',
//         url: 'https://rapid-sms-api.p.rapidapi.com/sms',
//         headers: {
//             'content-type': 'application/json',
//             'X-RapidAPI-Key': 'dd5a1ab3admsh2ac1ed907926115p1e3b95jsn29f55ea50e82',
//             'X-RapidAPI-Host': 'rapid-sms-api.p.rapidapi.com'
//         },
//         body: smsData,
//         json: true
//     };

//     request(options, function (error, response, body) {
//         if (error) throw new Error(error);
//         console.log(body);
//     });

//     // const smsOptions = {
//     //     method: 'POST',
//     //     url: 'https://rapid-sms-api.p.rapidapi.com/sms',
//     //     headers: {
//     //         'content-type': 'application/json',
//     //         'X-RapidAPI-Key': '95cf63b8c5msh1d941a609574149p1ff08ajsn2a25c83c7544',
//     //         'X-RapidAPI-Host': 'rapid-sms-api.p.rapidapi.com'
//     //     },
//     //     body: smsData,
//     //     json: true
//     // };

//     // request(smsOptions, function (error, response, body) {
//     //     if (error) {
//     //         console.error(error);
//     //         return callback(error, null);
//     //     }

//     //     console.log(body); // You can log the SMS response here
//     //     return callback(null, fullHash);
//     // });
//     //---rapid api a
//     return fullHash;
// }

async function verifyOTP(params, callback) {
    let [hashValue, expires] = params.hash.split('.');
    let now = Date.now();
    if (now > parseInt(expires)) return callback(null, "OTP Expired");
    let data = `${params.phone}.${params.otp}.${expires}`;
    let newCalculatedHash = crypto.createHmac("sha256", key).update(data).digest("hex");
    if (newCalculatedHash === hashValue) {
        return callback(null, "Success")
    }
    else {
        return callback(null, "Invalid OTP")
    }
}

async function addname(params, callback) {
    try {
        const { phone, name, city } = params;
        // Find the user document by phone number and update the specified key-value pair
        const updatedUser = await UserModel.findOneAndUpdate(
            { phone },
            { $set: { ["name"]: name, ["city"]: city } },
            { new: true }
        );

        const updatedUsr = await UserModel.find(
            { phone },
            { $set: { ["name"]: name, ["city"]: city } },
            { new: true }
        );

        if (!updatedUser) {
            console.log("User not found");
            return callback("User not found");
        }
        // Log the updated user document
        console.log("Updated User:", updatedUser);
        console.log("Key-value pair updated successfully");
        return callback(null, "Success");
    } catch (error) {
        console.error("Error:", error);
        return callback("Failed to update key-value pair");
    }
}

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

module.exports = { registerUser, FindUser, verifyOTP, addname, registerHospital, findHospital, verifyMobile, verifyMail, hospitalBasicDetail };



