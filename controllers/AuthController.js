const mongoose = require("mongoose");
const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner= require("../models/partner_preference")
const C_Codes = require("../utils/datas");
const tokenCreate = require("../utils/tokeCreate");
const profileCode= require("../utils/profileCodeGenerator");
const storage = require("node-sessionstorage");

exports.Register = async function (req, res) {
  const { role, uname, gender, phonenum, code, email, password } = req.body;
  let phone = code + phonenum;
  let status = "Active";
  
  let profile_id="MM1000";
  

  await user.find({},(err,data)=>{
    if(data) {  
      
      data.map((usr)=>{
        return(
          // console.log(usr.profile_id)

          profile_id=profileCode.proCode(usr.profile_id)
        ) 
    })
  }
  });
   
  // console.log(profile_id);

  
  let newUser = { role, uname, gender, phone, email, password, status,profile_id };
  let newArr = C_Codes.CountryCodes();
  console.log(newUser);
  let data = await user.findOne({ email: email });
  if (data) {
    let message = "Account with this email id already exist...!!! ";
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
  try{
  let data = await user.findOne({
    $or: [{ email: username }, { phone: username }],
    password: password,
  });


  if (data) {
    let token = tokenCreate.CreateToken({ id: data._id }, "shhhh");
    await res.cookie("user_token", token);
    await res.redirect("/my_ profile");
  }
  else{
    let message = "Invalid Credentials...!!! ";
    res.render("user_views/user_login", {message });
  }
}
catch(error){
  let msg=error;
  res.render("user_views/user_login", {msg });

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
    let user_id =mongoose.Types.ObjectId(req.cookies.userid);
    console.log(user_id,typeof user_id)
    
    let data = await user.findOne({ _id: user_id });
    let data1= await personal.findOne({user_id:user_id})
   console.log(data);
   console.log(data1);
  var d = new Date();
  var CurrentYr = d.getFullYear();
  let dob=data1.dob;
  let Yr=dob.slice(0,4);
  let age=CurrentYr-Number(Yr);
  let username=data.uname;
  let height=data1.height;
  
  
 

   user_id = String(user_id);
   let profile_pic="";
  let profile_pic_status="Inactive";
   let personalData = { ...req.body, user_id ,age,username,height,profile_pic,profile_pic_status};
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

      let user_id = req.cookies.userid;
    
     extra.findOneAndUpdate({user_id:user_id},{profile_pic:img.name},{useFindAndModify: false},(err,data)=>{

      if(err)    console.log(err)
      else{
        res.redirect("/partner_Preference");
      }
     });
   
      
    }
  });
};
exports.Partner_preference = function (req, res) {
  console.log(req.body);
  let user_id = req.cookies.userid;
  console.log(user_id);

const{age_from,age_to,height,weight,m1,m2,m3,m4,m5,m6,p1,p2,p3,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,e1,e2,e3,e4,e5,e6,e7,e8,f1,f2,f3,f4,f5,f6,country,state,district,place,about}=req.body;
let m_status=[m1,m2,m3,m4,m5,m6].filter(function( element ) {
  return element !== undefined;
});
let p_status=[p1,p2,p3].filter(function( element ) {
  return element !== undefined;
});
let p_sect=[s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11].filter(function( element ) {
  return element !== undefined;
});
let education =[e1,e2,e3,e4,e5,e6,e7,e8].filter(function( element ) {
  return element !== undefined;
});
let fin_status=[f1,f2,f3,f4,f5,f6].filter(function( element ) {
  return element !== undefined;
});

let partnerObj={
  age_from,age_to,height,weight,m_status,p_status,p_sect,education,fin_status,country,state,district,place,about,user_id
}
console.log(partnerObj);
partner.create(partnerObj,(err,data)=>{
   if(data){
     console.log(data);
     res.redirect('/my_profile')
   }
   else{
     console.log(err)
   }
})







};
