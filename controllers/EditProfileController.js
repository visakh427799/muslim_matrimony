const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner = require("../models/partner_preference");
const shortlist = require('../models/shortlisted_profiles');
const fs = require("fs");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
var C_Codes = require("../utils/datas");
const newArr = C_Codes.CountryCodes();
const heights = C_Codes.Heights();
const weights = C_Codes.Weights();
const mongoose = require('mongoose')
exports.EditProfile = async function (req, res) {
  // console.log(req.body);
    if(res.user){

     let u_id=res.user.id;
     let id=u_id;
    //  console.log(u_id)
     u_id=mongoose.Types.ObjectId(u_id);
     let d=await extra.findOne({user_id:u_id});
     let d5=await user.findOne({_id:u_id});
     let {email,role,marital_status,children,no_children,dob,height,weight,religion,sect,complexion,body_type,physical_status,mother_tongue,education,job,country,state,district,place,financial_status,home_type,father_details,mother_details,no_sisters,no_brothers,address,p_code,phone_second,w_code,whatsapp_number,about,uname,phonenum,age,gender,pro_img,pro_img_code}=req.body;
     let pers={
      marital_status:marital_status ,
      children:children,
      no_children:no_children ,
      dob:dob ,
      height:height ,
      weight:weight ,
      religion: religion,
      sect:sect ,
      complexion: complexion,
      body_type:body_type ,
      physical_status:physical_status ,
      mother_tongue:mother_tongue ,
      education:education ,
      job:job ,
      user_id:u_id,
     }
     let extras={
  
      age:age,
      gender:gender,
      profile_pic:d.profile_pic,
      profile_pic_status:d.profile_pic_status,
      username:uname,
      height:height,
      country:country ,
      state:state ,
      district:district ,
      place:place ,
      financial_status: financial_status,
      home_type:home_type,
      father_details:father_details ,
      mother_details:mother_details ,
      no_sisters: no_sisters,
      no_brothers: no_brothers,
      address:address ,
      p_code:p_code ,
      phone_second:phone_second ,
      w_code: w_code,
      whatsapp_number:whatsapp_number ,
      about:about ,
      user_id:u_id,
      
     }
    let usr={
      role:role,
      uname:uname,
      gender:gender,
      phone:phonenum,
      email:email,
      password:d5.password,
      status:d5.status,
      profile_id:d5.profile_id,
      created_at:d5.created_at,
      deleted_at:d5.deleted_at

      
    }
     console.log(usr);
     
     


     let d1=await personal.findOneAndReplace({user_id:id},pers);
     if(d1){
      //  console.log(d1);
      let d2=await extra.findOneAndReplace({user_id:id},extras)
      if(d2){
    
        u_id=mongoose.Types.ObjectId(u_id)
        let d3=await user.findOneAndReplace({_id:u_id },usr)   
        if(d3){
          res.redirect("/user/my_profile");
   
            }
      }

     }
// console.log(per)

    

    
    
    }
  







};
exports.EditProfilePic = async function (req, res) {
  console.log(req.files);

  let img = req.files.img;

  let prevImage = req.cookies.user_img;

  if (prevImage !== "null") {
    const pathToFile = `./public/images/profile_images/${prevImage}`;
    console.log(pathToFile);
    fs.unlink(pathToFile, async function (err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully deleted the file.");
      }
    });
  }

  img.mv("./public/images/profile_images/" + img.name, async (err) => {
    if (err) return console.log(err);
    else {
      console.log("File uploaded");

      //db query mongo

      let user_id = res.user.id;
      console.log(user_id);
      await extra.findOneAndUpdate(
        { user_id: user_id },
        { profile_pic: img.name },
        { useFindAndModify: false },
        (err, data) => {
          if (err) console.log(err);
          else {
            res.clearCookie("user_img");
            res.cookie("user_img", img.name);
            res.redirect("/user/edit_profile");
          }
        }
      );
    }
  });

  //   // console.log(req.files);
};
exports.deleteAccount = async function (req, res) {
  console.log(req.body);

  let d1 = await user.deleteOne({ _id: req.body.id });
  let d2 = await personal.deleteOne({ user_id: req.body.id });
  let d3 = await extra.deleteOne({ user_id: req.body.id });
  let d4 = await partner.deleteOne({ user_id: req.body.id });
  console.log(d1);

  //clear all cookies

  //clear all collections

  if (d1 && d2 && d3 && d4) {
    res.clearCookie("userid");
    res.clearCookie("user_token");
    res.clearCookie("user_img");
    res.clearCookie("pr_id");

    res.json({
      delete: true,
    });
  }
};

exports.changePassword = async function (req, res) {
  let data = req.body.obj;
  await user.findOneAndUpdate(
    { _id: data.id },
    { password: data.password },
    { useFindAndModify: false },
    (err, data) => {
      if (data) {
        res.json({ success: true });
      } else {
        res.json({ success: false, message: "password has not been changed" });
      }
    }
  );

  //if Success
};
exports.forgotPassword = async function (req, res) {
  //if Success
  // let token='gt4t4ggg3g73h3h';
  let data = req.body.obj;
  // console.log(data.email);

  let d1 = await user.findOne({ email: data.email });

  if (d1) {
    let id = d1._id;
    let secret = d1.profile_id;
    let email = d1.email;
    let obj = { id, email };

    //  console.log(obj,secret)
    let token = jwt.sign(obj, secret, {
      algorithm: "HS256",
      expiresIn: "60",
    });
    console.log(token);
    var mailOptions = {
      from: "visakhsanthosh69@gmail.com",
      to: data.email,
      subject: "From Muslim Matrimony",
      text: `https://muslim-matrimony.herokuapp.com/user/forgot_password/${id}/${token}`,
    };

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visakhsanthosh69@gmail.com",
        pass: "427799@TVS",
      },
    });

    transport.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
        res.json({
          success: false,
          message: "Oops something went wrong please try again",
        });
      } else {
        res.json({ success: true });
      }
    });
  } else {
    res.json({
      success: false,
      message: "No account with this email id exist",
    });
  }
};

exports.shortList=async function(req,res){
let data=req.body.obj;
let user_id=res.user.id;
let flag=false;
let d3=await shortlist.find({user_id:user_id})

if(d3){
    d3.forEach((shrt)=>{
       if(shrt.partner_id==data.id){
          flag=true;
         
       }
   })




}
if(flag){

  res.json({success: false, message: "Profile already added...!!"})
}
else{
let d1 = await extra.findOne({user_id:data.id});

//console.log(d1);

let obj={
    user_id:user_id,
    partner_id:d1.user_id,
    partner_name:d1.username,
    partner_age:d1.age,
    partner_height:d1.height,
    partner_district:d1.district,
    partner_state:d1.state,
    partner_country:d1.country,
    partner_img:d1.profile_pic,

}

//console.log(obj);

let d2=await shortlist.create(obj);
if(d2){
  res.json({ success: true });
}
else{
  res.json({ success: false, message: "Oops something went wrong ...!!" });
}

}

// let d1=await shortlist.findOne({user_id:user_id});
// if(d1){
//   //update

// let d3=await shortlist.findOne({user_id:user_id});
// if(d3){

//    let oldShortlist=d3.shortlisted;
//    let newShortlist=[...oldShortlist,data.id];

   
//    newShortlist=[...new Set(newShortlist)]
//    console.log(newShortlist);
//    await shortlist.findOneAndUpdate(
//     { user_id: user_id },
//     { shortlisted:newShortlist },
//     { useFindAndModify: false },
//     (err, data) => {
//       if (data) {
       
//         res.json({ success: true });
//       } else {
//         res.json({ success: false, message: "Oops something went wrong ...!!" });
//       }
//     }
//   );



// }


// }
// else{
//   //create new shortlisted
//   let shortlisted=[data.id];
//   console.log(shortlisted);
//   shortlisted_users=[];
// let obj={
//   user_id,
//   shortlisted,
//   shortlisted_users,
// }
// console.log(obj)
//    let d2=await shortlist.create(obj);
//    if(d2){
//      console.log(d2)
//     res.json({
//       "success":true
//     })
//    }

//    else{
//     res.json({
//       "success":false,
//       "message":"Oops something went wrong...!!"
//     })
//    }
// }
   



}

exports.deleteShortlist=async function(req,res){
 
  let user_id=res.user.id;
  let data=req.body.obj;

  let d1=await shortlist.deleteOne({_id:data.id});

  if(d1){
    res.json({"success":true})
  }
  else{
    res.json({"success":false,"message":"Oops something went wrong..!!"})
  }
  



  
}

exports.editProfile=async (req,res)=>{

  if (res.user) {
    console.log(res.user);
    let id = res.user.id;
    let data = await user.findOne({ _id: id });
    let { _id, role, uname, gender, phone, email, profile_id } = data;
    let data2 = await personal.findOne({ user_id: id });
    let data3 = await extra.findOne({ user_id: id });
    console.log(id)
    let data4 = await partner.findOne({ user_id: id });
    
    const {
      dob,
      religion,
      sect,
      height,
      weight,
      marital_status,
      children,
      no_children,
      complexion,
      body_type,
      job,
      physical_status,
      mother_tongue,
      education,
    } = data2;
    let {
      age,
      username,
      profile_pic,
      profile_pic_status,
      country,
      state,
      place,
      district,
      financial_status,
      home_type,
      father_details,
      mother_details,
      no_sisters,
      no_brothers,
      address,
      about,
      p_code,
      phone_second,
      w_code,
      whatsapp_number

    } = data3;
    let pro_img = profile_pic;
    // if(profile_pic_status=="Inactive"){
    //   profile_pic=""
    // }

    let userObj = {
      _id: _id,
      uname: uname,
      role: role,
      dob: dob,
      gender: gender,
      phone: phone,
      religion: religion,
      email: email,
      sect: sect,
      profile_id: profile_id,
      profile_pic: profile_pic,
      height: height,
      weight: weight,
      marital_status: marital_status,
      children: children,
      no_children: no_children,
      complexion: complexion,
      body_type: body_type,
      physical_status: physical_status,
      mother_tongue: mother_tongue,
      education: education,
      job: job,
      age: age,
    };

    let userExtra = {
      about: about,
      country: country,
      state: state,
      place: place,
      district: district,
      financial_status: financial_status,
      home_type: home_type,
      father_details: father_details,
      mother_details: mother_details,
      no_sisters: no_sisters,
      no_brothers: no_brothers,
      address: address,
      p_code:p_code,
      phone_second:phone_second,
      w_code:w_code,
      whatsapp_number:whatsapp_number,
    };

    let userPrefer = { ...data4 };
    userPrefer = userPrefer._doc;
    console.log(userPrefer)
    
  let img=req.cookies.user_img;
  let pr_id=req.cookies.pr_id;
  res.render("user_views/edit_profile",{heights,weights,img,pr_id,newArr,userObj,
    userExtra,
    userPrefer,});

  }



}