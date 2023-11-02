const UserModel = require('../model/user.model');
const otpGenerator = require('otp-generator');
const crypto = require('crypto');
const key = 'otp-secret-key';
const twilio = require('twilio');
const mongoose = require("mongoose");
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


async function GetUserDetails(phone, callback) {
    try {
        // const { phone } = params;
        // if (!phone) {
        //     throw new Error("PHONE NUMBER REQUIRED");
        // }
        console.log("phone", phone);
        const existuser = await UserModel.findOne(
            { phone },
        );
        console.log("updatedUsr");
        console.log(existuser);
        // return await createUser.save();
        // const result = existuser;
        if (existuser) {
            return existuser;
        }
        else {
            return "Not FOUND";
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
        const { phone, name, city, mail } = params;
        console.log("inside");
        // Find the user document by phone number and update the specified key-value pair
        // const updatedUser = await UserModel.findOneAndUpdate(
        //     { phone },
        //     { $set: { name,city}},
        //     { new: true }
        // );

        const updatedUsr = await UserModel.find({ phone: phone });

        updatedUsr.name = name;
        updatedUsr.city = city;
        updatedUsr.mail = mail;
        await updatedUsr.save();

        if (!updatedUsr) {
            console.log("User not found");
            return callback("User not found");
        }
        // Log the updated user document
        console.log("Updated User:", updatedUsr);
        console.log("Key-value pair updated successfully");
        return callback(null, "Success");
    } catch (error) {
        console.error("Error:", error);
        return callback("Failed to update key-value pair");
    }
}




async function fetchUHID(params, callback) {
    try {
        const { id } = params;
        // if (!_id) {
        //     throw new Error("PHONE NUMBER REQUIRED");
        // }
        const existuser = await UserModel.findOne(
            { id },
        );
        console.log("updatedUsr");
        console.log(existuser);
        // return await createUser.save();
        // const result = existuser;
        if (existuser) {
            const uhid = existuser['_id'];
            return uhid;
        }
        else {
            return "uhid not found ";
        }

    } catch (err) {
        throw err;
    }
}


module.exports = { registerUser, FindUser, verifyOTP, addname, fetchUHID, GetUserDetails };



