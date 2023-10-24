const UserService = require("../services/user.services");
const HospitalService = require("../services/hospital.services");
const AppointmentService = require("../services/appointment.services");

const CampModel = require("../model/camps.model");
const UserModel = require("../model/user.model");
const multer = require("multer");
const imagekit = require("imagekit");

const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const HospitalModel = require("../model/hospital.model");
const DoctorModel = require("../model/doctor.model");
exports.register = async (req, res, next) => {
  try {
    const { phone } = req.body;
    const successRes = await UserService.registerUser(phone);
    // console.log(successRes);
    // res.json({ status: true, success: `user Registered succesfully ${phone}`, otp: `${successRes}` });
    return res.status(200).send({
      status: true,
      success: `user Registered succesfully ${phone}`,
      otp: `${successRes["otp"]}`,
      hashk: `${successRes["hash"]}`,
    });
  } catch (error) {
    throw error;
  }
};

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
  });
};

exports.addName = (req, res, next) => {
  UserService.addname(req.body, (error, results) => {
    if (error) {
      return next(error);
    }
    return res.status(200).send({
      message: "Success",
      data: results,
    });
  });
};

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
  } catch (error) {
    throw error;
  }
};

exports.registreHospital = async (req, res, next) => {
  try {
    const successRes = await HospitalService.registerHospital(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.FindHospital = async (req, res, next) => {
  try {
    const successRes = await HospitalService.findHospital(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.VerifyMobile = async (req, res, next) => {
  try {
    const successRes = await HospitalService.verifyMobile(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.VerifyMobile = async (req, res, next) => {
  try {
    const successRes = await HospitalService.verifyMobile(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.VerifyMail = async (req, res, next) => {
  try {
    const successRes = await HospitalService.verifyMail(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.addBasicDetails = async (req, res, next) => {
  try {
    const successRes = await HospitalService.hospitalBasicDetail(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.addGovtDetails = async (req, res, next) => {
  try {
    const successRes = await HospitalService.hospitalGovernmenttDetails(
      req.body
    );
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.genData = async (req, res) => {
  const _id = req.params.id;
  console.log("Inside");
  const { age, height, weight, bp, sugar } = req.body;
  console.log(age, height, weight, bp, sugar, _id);
  try {
    if (_id) {
      await UserModel.updateOne(
        { _id },
        {
          $set: {
            "gen_data.age": age,
            "gen_data.height": height,
            "gen_data.weight": weight,
            "gen_data.bp": bp,
            "gen_data.sugar": sugar,
          },
        }
      );
      res.json({ success: true });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    throw error;
  }
};
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
    const { id } = req.params.id;
    const { title, date } = req.body;

    const { reportpdf } = req.files;

    try {
      const file1 = fs.readFileSync(reportpdf[0].path);

      const base1 = file1.toString("base64");

      const FileUplaodResult = await imagekitClient.upload({
        file: base1,
        fileName: reportpdf[0].originalname,
      });

      // Upload Image 2 to ImageKit

      await UserModel.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            reports: {
              title,
              date,
              fileURL: FileUplaodResult.url,
            },
          },
        },
        { new: true }
      );
      res.status(200).send({ success: true });
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(400).send("INVALID");
  }
};

exports.fetchUser = async (req, res) => {
  const id = req.params.id;
  try {
    if (id) {
      const user = await UserModel.find({ _id: id });
      res.status(200).send(user);
    } else {
      res.status(400).json({ success: false });
    }
  } catch (err) {
    console.log(error);
  }
};

exports.postCamp = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    const { age, title, start_date, end_date, boost } = req.body;

    const camp = await CampModel.create({
      title,
      age,
      start_date,
      end_date,
      boost,
      HospitalID: id,
    });
    res.status(201).send({ success: true });
  } catch (error) {
    console.log(error);
    res.send({ success: false });
  }
};

exports.genIdPwd = async (req, res, next) => {
  try {
    const successRes = await HospitalService.generateHospitalIdPwd(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.hospitalLogin = async (req, res, next) => {
  try {
    const successRes = await HospitalService.hospitalLogin(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.allHospital = async (req, res, next) => {
  try {
    const successRes = await HospitalService.allhospitals(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.bookAppointment = async (req, res, next) => {
  try {
    const successRes = await AppointmentService.bookAppointment(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.getAppointment = async (req, res, next) => {
  try {
    const successRes = await AppointmentService.getAppointment(req.body);
    return res.status(200).send({
      status: true,
      message: "Success",
      data: successRes,
    });
  } catch (error) {
    throw error;
  }
};

exports.addDoc = async (req, res) => {
  const id = req.params.id;
  const { name, spec, email, phone } = req.body;

  try {
    const hosp = await HospitalModel.find({ _id: id });
    const hopname = hosp[0].hospitalName;

    const uppercaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseLetters = "abcdefghijklmnopqrstuvwxyz";
    const numbers = "0123456789";
    const specialCharacters = "!@#$&_";

    // Create a string that contains all the allowed characters
    const allCharacters = uppercaseLetters + lowercaseLetters + numbers;

    let password = "";

    // Add one random special character

    // Add 7 more characters from the combined set of uppercase, lowercase, and numbers
    for (let i = 0; i < 7; i++) {
      password +=
        allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    // Shuffle the password characters to make it random

    const array = password.split("");
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    password = array.join("");
    password +=
      specialCharacters[Math.floor(Math.random() * specialCharacters.length)];

    const transporter = nodemailer.createTransport({
      host: "smtp.zoho.in",
      port: 465,
      secure: true, // Use SSL/TLS
      auth: {
        user: "blacksparrowdevs@zohomail.in", // Replace with your Zoho Mail email address
        pass: "Sparrow@Tech", // Replace with your Zoho Mail password
      },
    });

    const mailOptions1 = {
      from: "blacksparrowdevs@zohomail.in",
      to: `${email}`,
      subject: `Congrates! You are registered.`,
      html: `<p>Dear User</p>
        <p>We are delighted to inform you that you are regsitered with EHS under ${hopname}.</p>
        <p>Below is your credentials given for login.</p>
        <ul>
        <li>Email: <strong>${email}</strong></li>
        <li>Password: <strong>${password}</strong></li>
        </ul>`,
    };

    transporter.sendMail(mailOptions1, (error, info) => {
      if (error) {
        console.error(error);
        res.send("An error occurred while sending the email.");
      } else {
        console.log("Email sent successfully to recipient 1:", info.response);
      }
    });
    const encPass = await bcrypt.hash(password, 10);

    const doc = await DoctorModel.create({
      email,
      speciality: spec,
      pass: encPass,
      fullname: name,
      phone,
      hospitalID: id,
    });

    res.status(201).send({ success: true });
  } catch (error) {
    console.log(error);
  }
};
