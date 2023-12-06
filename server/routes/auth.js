const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();
const bcryptjs = require('bcryptjs');

//SIGN UP
router.post("/signup", async (req, res) => {
  const newUser = new User({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    email: req.body.email,
    isAdmin: req.body.isAdmin,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET
    ).toString(),
  });

  try {
    // CHECK EMAIL
    const username = await User.findOne({ username: req.body.username });
    if (username)
      return res.status(401).json("The username you provided is taken");
    // CREATE USER
    const savedUser = await newUser.save();
    // SIGN TOKEN
    const accessToken = jwt.sign(
      { id: savedUser._id, isAdmin: savedUser.isAdmin },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );
    // SEND RESPONSE
    const { password, ...userData } = savedUser._doc;
    return res.status(201).json({ accessToken, ...userData });
  } catch (err) {
    res.status(500).json(err);
  }
});

//SIGN IN
router.post("/signin", async (req, res) => {
  try {
    const user = await User.findOne({
      username: req.body.username,
    });

    if (!user) return res.status(401).json("Incorrect username");

    const encryptedPassword = CryptoJS.AES.decrypt(
      user.password,
      process.env.SECRET
    );

    const originalPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);

    const inputPassword = req.body.password;

    if (originalPassword !== inputPassword)
      return res.status(401).json("Incorrect password");

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_KEY,
      { expiresIn: "3d" }
    );

    const { password, ...userData } = user._doc;
    res.status(200).json({ ...userData, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

// FORGET PASSWORD

router.post("/forget-password", async (req, res) => {
  const { email } = req.body;

  try {
    if(email){
      const isUser = await User.findOne({ email: email });
      if (!isUser) {return res.status(401).json("Email not found")}
      else{
        // token
        const secretKey = process.env.SECRET + isUser._id;

        const token = jwt.sign({ userID: isUser._id }, secretKey, { expiresIn: "20m" });

        // const link = `https://vikkilini.netlify.app/#/reset/${isUser._id}/${token}`;
        const link = `http://localhost:3000/#/reset/${isUser._id}/${token}`;

        const transport = nodemailer.createTransport({
          service: "gmail",
            host: "smtp.gmail.com",
            port: 465,
            auth: {
              user: process.env.EMAIL,
              pass: process.env.PASSWORD,
            },
          });

        const data = {
          from: "vikkilini@gmail.com",
          to: email,
          subject: `Password Reset Request`,
          html: `
                  <!doctype html>
        <html lang="en-US">

        <head>
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title>Reset Password Email Template</title>
            <meta name="description" content="Reset Password Email Template.">
            <style type="text/css">
                a:hover {text-decoration: underline !important;}
            </style>
        </head>

        <body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
            <!--100% body table-->
            <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
                style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
                <tr>
                    <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                    
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href=${link}
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                   
                </table>
            </td>
        </tr>
    </table>
    <!--/100% body table-->
</body>

</html>`,
            html: `
<!doctype html>
<html lang="en-US">

<head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title>Reset Password Email Template</title>
    <meta name="description" content="Reset Password Email Template.">
    <style type="text/css">
        a:hover {text-decoration: underline !important;}
    </style>
</head>

<body marginheight="0" topmargin="0" marginwidth="0" style="margin: 0px; background-color: #f2f3f8;" leftmargin="0">
    <!--100% body table-->
    <table cellspacing="0" border="0" cellpadding="0" width="100%" bgcolor="#f2f3f8"
        style="@import url(https://fonts.googleapis.com/css?family=Rubik:300,400,500,700|Open+Sans:300,400,600,700); font-family: 'Open Sans', sans-serif;">
        <tr>
            <td>
                <table style="background-color: #f2f3f8; max-width:670px;  margin:0 auto;" width="100%" border="0"
                    align="center" cellpadding="0" cellspacing="0">
                   
                    <tr>
                        <td>
                            <table width="95%" border="0" align="center" cellpadding="0" cellspacing="0"
                                style="max-width:670px;background:#fff; border-radius:3px; text-align:center;-webkit-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);-moz-box-shadow:0 6px 18px 0 rgba(0,0,0,.06);box-shadow:0 6px 18px 0 rgba(0,0,0,.06);">
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                                <tr>
                                    <td style="padding:0 35px;">
                                        <h1 style="color:#1e1e2d; font-weight:500; margin:0;font-size:32px;font-family:'Rubik',sans-serif;">You have
                                            requested to reset your password</h1>
                                        <span
                                            style="display:inline-block; vertical-align:middle; margin:29px 0 26px; border-bottom:1px solid #cecece; width:100px;"></span>
                                        <p style="color:#455056; font-size:15px;line-height:24px; margin:0;">
                                            We cannot simply send you your old password. A unique link to reset your
                                            password has been generated for you. To reset your password, click the
                                            following link and follow the instructions.
                                        </p>
                                        <a href="${link}"
                                            style="background:#20e277;text-decoration:none !important; font-weight:500; margin-top:35px; color:#fff;text-transform:uppercase; font-size:14px;padding:10px 24px;display:inline-block;border-radius:50px;">Reset
                                            Password</a>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="height:40px;">&nbsp;</td>
                                </tr>
                            </table>
                        </td>
                          
                        </table>
                    </td>
                </tr>
            </table>
            <!--/100% body table-->
        </body>

        </html>`,
        };

        transport.sendMail(data, (error, info) => {
          if (error) {
            return res.status(400).json({ message: "Error" });
          }
          return res.status(200).json({ message: "Email Sent" });
        });

      }
    }else{
      res.status(400).json({ message: "Email is required" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// RESET PASSWORD

router.post("/forget-password/:id/:token", async (req, res) => {
  const { id, token } = req.params;
  const { newPassword, confirmPassword } = req.body;

  try {
    if (id && token && newPassword && confirmPassword) {
      if (newPassword === confirmPassword) {
        const isUser = await User.findById(id);
        const secretKey = process.env.SECRET + isUser._id;
        const isValid = jwt.verify(token, secretKey);

        if (isValid) {
          const encryptedNewPassword = CryptoJS.AES.encrypt(
            newPassword,
            process.env.SECRET
          ).toString();

          const isSuccess = await User.findByIdAndUpdate(isUser._id, {
            $set: {
              password: encryptedNewPassword,
            },
          });

          if (isSuccess) {
            return res.status(200).json({
              message: "Password Changed Successfully",
            });
          }
        } else {
          return res.status(400).json({
            message: "Link has expired",
          });
        }
      }
    } else {
      res.status(400).json({ message: "All fields are required" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.post("/verify", async (req, res) => {
//   const { token } = req.params;
//     try {
//       if (token) {
//         // token verify
//         const secretKey = process.env.RESET_PASSWORD_KEY + isUser._id;
//         const isEmailVerified = await jwt.verify(token, secretKey);
//         if (isEmailVerified) {
//           const getUser = await authModel.findOne({
//             email: isEmailVerified.email,
//           });

//           const saveEmail = await authModel.findByIdAndUpdate(getUser._id, {
//             $set: {
//               isVerified: true,
//             },
//           });

//           if (saveEmail) {
//             return res
//               .status(200)
//               .json({ message: "Email Verification Success" });
//           }

//           //
//         } else {
//           return res.status(400).json({ message: "Link Expired" });
//         }
//       } else {
//         return res.status(400).json({ message: "Invalid URL" });
//       }
//     } catch (error) {
//       return res.status(400).json({ message: error.message });
//     }
// });

module.exports = router;
