const mongoose = require('mongoose');
const db = require('../config/db');

const { Schema } = mongoose;

const hospitalSchema = new Schema({
    hospital_login_cred: {
        hid: {
            type: String,
            unique: true
        },
        pwd: String
    },

    mail: {
        type: String,
        lowercase: true,
        require: true,
        unique: true,
    },
    mailHash: {
        type: String,
    },
    mobile: {
        type: String,
        unique: true,

    },
    mobileHash: {
        type: String
    },
    hospitalName: {
        type: String,
    },
    ownership: {
        type: String,
    },
    staffSize: {
        type: String,
    },
    city: {
        type: String,
    },
    state: {
        type: String,
    },
    pinCode: {
        type: String,
    },
    type: {
        type: String,
    },
    features: {
        type: String,
    },
    yearOfEstablishment: {
        type: String,
    },
    haveLabs: {
        type: String,
    },
    PathologyLicense: {
        type: String,
    },
    allowAppointment: {
        type: String,
    },
    address1: {
        type: String,
    },
    address2: {
        type: String,
    },
    address3: {
        type: String,
    },
    telephone: {
        type: String,
    },

    Tan: {
        type: String,
    },
    Pan: {
        type: String,
    },
    hospitalLicense: {
        type: String,
    },
    mobileotp: {
        type: String,
    },
    mailotp: {
        type: String,
    },
});

const HospitalModel = db.model('hospital', hospitalSchema);
module.exports = HospitalModel;