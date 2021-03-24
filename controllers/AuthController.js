const mongoose = require("mongoose");
const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const C_Codes = require("../utils/datas");
const tokenCreate = require("../utils/tokeCreate");
const storage = require("node-sessionstorage");

exports.Register = async function (req, res) {
  const { role, uname, gender, phonenum, code, email, password } = req.body;
  let phone = code + phonenum;
  let status = "Active";
  
  let profile_id="MM1999";
  let profile_pic="";
  let profile_pic_status="Inactive";
  let last_user="";
  await user.find({},(err,data)=>{
    if(data) {  
      
      data.map((usr)=>{
        return(
          // console.log(usr.profile_id)

          profile_id=usr.profile_id+1
        ) 
    })
  }
  });
   
  let newUser = { role, uname, gender, phone, email, password, status,profile_id,profile_pic,profile_pic_status };
  let newArr = C_Codes.CountryCodes();
  console.log(newUser);
  let data = await user.findOne({ email: email });
  if (data) {
    let message = "Account with this email id already exist ";
    res.render("index", { title: "Express", newArr, message });
  } else {
    await user.create(newUser, (err, data) => {
      if (err) {
        res.json({
          Error: err,
        });
      } else {
        // let token=tokenCreate.CreateToken({email:email,id:data._id},'shhhh');
        res.cookie("userid", data._id);

        // console.log(token)
        res.redirect("/complete_profile1");
      }
    });
  }
};

exports.Login = async function (req, res) {
  let { username, password } = req.body;

  let data = await user.findOne({
    $or: [{ email: username }, { phone: username }],
    password: password,
  });

  if (data) {
    let token = tokenCreate.CreateToken({ id: data._id }, "shhhh");
    await res.cookie("user_token", token);
    await res.redirect("/profile");
  }
};

exports.Logout = async function (req, res) {
  res.clearCookie("userid");
  res.clearCookie("user_token");

  res.redirect("/login");
};

exports.Complete_profile1 = async function (req, res) {
  // console.log(req.body);
  if (req.cookies) {
    let user_id = req.cookies.userid;

    user_id = String(user_id);
    let personalData = { ...req.body, user_id };
    console.log(personalData);

    await personal.create(personalData, (err, data) => {
      if (data) {
        console.log(data);
        res.redirect("/complete_profile2");
      } else {
        console.log(err);
        res.redirect("/complete_profile1");
      }
    });
  }
};

exports.Complete_profile2 = async function (req, res) {
  // console.log(req.body);
  if (req.cookies) {
    let user_id = req.cookies.userid;

    user_id = String(user_id);
    let personalData = { ...req.body, user_id };
    console.log(personalData);

    let token = tokenCreate.CreateToken({ id: user_id }, "shhhh");
    // await res.clearCookie('userid');
    await res.cookie("user_token", token);
    await extra.create(personalData, (err, data) => {
      if (data) {
        console.log(data);

        res.redirect("/profile_photo");
      } else {
        console.log(err);
        res.redirect("/complete_profile2");
      }
    });
  }
};

exports.Profile_photo = function (req, res) {
  //
  let { img } = req.files;

  img.mv("./public/images/profile_images/" + img.name, (err) => {
    if (err) return console.log(err);
    else {
      console.log("File uploaded");

      //db query mongo
      res.redirect("/partner_Preference");
    }
  });
};
exports.Partner_preference = function (req, res) {
  console.log(req.body);
};
