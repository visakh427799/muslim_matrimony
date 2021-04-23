const mongoose = require("mongoose");
const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner = require("../models/partner_preference");
const C_Codes = require("../utils/datas");
const tokenCreate = require("../utils/tokeCreate");
const profileCode = require("../utils/profileCodeGenerator");
const storage = require("node-sessionstorage");
const nodemailer = require('nodemailer');
const otp      = require('../utils/otpGenerator');
exports.Register = async function (req, res) {
  const { role, uname, gender, phonenum, code, email, password } = req.body;
  let phone = phonenum;
  let status = "Active";
  let otp="";
  let email_verified=false;
  let profile_id="MM1000";
  let s1=false;
  let s2=false;
  let s3=false;
  let s4=false;
  await user.find({}, (err, data) => {
    if (data) {
      data.map((usr) => {
        return (
          // console.log(usr.profile_id)

          ( profile_id=profileCode.proCode(usr.profile_id))
        );
      });
    }
    else{
            profile_id="MM1000";
    }
  });

  // console.log(profile_id);

  let newUser = {
    role,
    uname,
    gender,
    phone,
    code,
    email,
    password,
    status,
    otp,
    email_verified,
    profile_id,
    s1,
    s2,
    s3,
    s4
  };
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
        res.redirect("/user/email_verification");
      }
    });
  }
};

exports.Login = async function (req, res) {
  let { username, password } = req.body;

  try {
    let data = await user.findOne({
      $or: [{ email: username }, { phone: username }, { profile_id: username }],
      password: password,
    });

    if (data) {
      console.log(data)
      res.cookie("userid", data._id);
        //  if(data.email_verified){
        //   let token = tokenCreate.CreateToken({ id: data._id }, "shhhh");
        //   await res.cookie("user_token", token);
    
        //   await res.redirect("/user/my_profile");
        //  }

        //  else{
        //   await res.redirect("/user/email_verification");
        //  }
      
if(data.email_verified&&data.s1&&data.s2&&data.s3&&data.s4){
  let token = tokenCreate.CreateToken({ id: data._id }, "shhhh");
          await res.cookie("user_token", token);
    
          await res.redirect("/user/my_profile");
}
else if(data.email_verified&&data.s1&&data.s2&&data.s3&&!data.s4){
       await res.redirect("/user/profile_photo");

}
else if(data.email_verified&&data.s1&&data.s2&&!data.s3&&!data.s4){

await res.cookie("user_token", token);

         res.redirect("/user/partner_Preference");
}  
else if(data.email_verified&&data.s1&&!data.s2&&!data.s3&&!data.s4) {
  
  res.redirect("/user/complete_profile2");

    
  
}
else if(data.email_verified&&!data.s1&&!data.s2&&!data.s3&&!data.s4){
  
  res.cookie("userid", data._id);
  res.redirect("/user/complete_profile1");

}
else if(!data.email_verified&&!data.s1&&!data.s2&&!data.s3&&!data.s4){
  res.redirect('user/email_verification')
  
}
   else{
  res.redirect('user/register')
   

   }
     
    }
    
    else {
      let message = "Invalid Credentials...!!! ";
      res.render("user_views/user_login", { message });
    }
  } catch (error) {
    let msg = error;
    res.render("user_views/user_login", { msg });
  }
};

exports.Logout = async function (req, res) {
  res.clearCookie("userid");
  res.clearCookie("user_token");
  res.clearCookie("user_img");
  res.clearCookie("pr_id");
  res.redirect("/user/login");
};

exports.Complete_profile1 = async function (req, res) {
  console.log(req.body);
  if (req.cookies) {
    let user_id = req.cookies.userid;

    user_id = String(user_id);
    let personalData = { ...req.body, user_id };
    console.log(personalData);

    await personal.create(personalData, async (err, data) => {
      if (data) {
        console.log(data);
        let d=await user.findOneAndUpdate({_id:user_id},{s1:true},{ useFindAndModify: false })
          if(d){
            res.redirect("/user/complete_profile2");
          }
          else{
        res.redirect("/user/complete_profile1");

          }
        
      } else {
        console.log(err);
        res.redirect("/user/complete_profile1");
      }
    });
  }
  else{
    res.redirect('/user/login');
  }
};

exports.Complete_profile2 = async function (req, res) {
  // console.log(req.body);
  if (req.cookies) {
    let user_id = mongoose.Types.ObjectId(req.cookies.userid);
    console.log(user_id, typeof user_id);

    let data = await user.findOne({ _id: user_id });
    let data1 = await personal.findOne({ user_id: user_id });
    console.log(data);
    console.log(data1);
    var d = new Date();
    var CurrentYr = d.getFullYear();
    let dob = data1.dob;
    let Yr = dob.slice(0, 4);
    let age = CurrentYr - Number(Yr);
    let username = data.uname;
    let height = data1.height;
    let gender=data.gender;
    user_id = String(user_id);
    let profile_pic = "";
    let profile_pic_status = "Inactive";
    let personalData = {
      ...req.body,
      user_id,
      age,
      gender,
      username,
      height,
      profile_pic,
      profile_pic_status,
    };
    console.log(personalData);

    // let token = tokenCreate.CreateToken({ id: user_id }, "shhhh");
     
    // await res.cookie("user_token", token);
    await extra.create(personalData, async(err, data) => {
      if (data) {
        console.log(data);
        let d=await user.findOneAndUpdate({_id:user_id},{s2:true},{ useFindAndModify: false })
        if(d){
          res.redirect("/user/partner_Preference");
        }
        else{
      res.redirect("/user/complete_profile2");

        }
      
       
      } else {
        console.log(err);
        res.redirect("/user/complete_profile2");
      }
    });
  }

  else{
    res.redirect('/user/login')
  }
};

exports.Profile_photo = async function (req, res) {
  //
  
  if(req.files){
    console.log(req.files)
  let { img } = req.files;

  img.mv("./public/images/profile_images/" + img.name, (err) => {
    if (err) return console.log(err);
    else {
      console.log("File uploaded");

      //db query mongo

      let user_id = req.cookies.userid;

      extra.findOneAndUpdate(
        { user_id: user_id },
        { profile_pic: img.name },
        { useFindAndModify: false },
        async (err, data) => {
          if (err) console.log(err);
          else {
      
     
      let d=await user.findOneAndUpdate({_id:user_id},{s4:true},{ useFindAndModify: false })
        if(d){
         let token = tokenCreate.CreateToken({ id: user_id }, "shhhh");
     
       await res.cookie("user_token", token);
      res.redirect("/user/my_profile");

         
        }
        else{
          res.redirect("/user/profile_photo");

        }
           
            
          }
        }
      );
    }
  });

}
  

  // else{
  //   res.redirect('/user/login')
  // }

};
exports.Partner_preference = async function (req, res) {
  if(req.cookies){
  console.log(req.body);
  let user_id = req.cookies.userid;
  console.log(user_id);

  const {
    age_from,
    age_to,
    height_from,
    height_to,
    m1,
    m2,
    m3,
    m4,
    m5,
    m6,
    p1,
    p2,
    p3,
    s1,
    s2,
    s3,
    s4,
    s5,
    s6,
    s7,
    s8,
    s9,
    s10,
    s11,
    e1,
    e2,
    e3,
    e4,
    e5,
    e6,
    e7,
    e8,
    f1,
    f2,
    f3,
    f4,
    f5,
    f6,
    country,
    state,
    district,
    place,
    about,
  } = req.body;
  let m_status = [m1, m2, m3, m4, m5, m6].filter(function (element) {
    return element !== undefined;
  });
  let p_status = [p1, p2, p3].filter(function (element) {
    return element !== undefined;
  });
  let p_sect = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11].filter(function (
    element
  ) {
    return element !== undefined;
  });
  let education = [e1, e2, e3, e4, e5, e6, e7, e8].filter(function (element) {
    return element !== undefined;
  });
  let fin_status = [f1, f2, f3, f4, f5, f6].filter(function (element) {
    return element !== undefined;
  });

  let partnerObj = {
    age_from,
    age_to,
    height_from,
    height_to,
    m_status,
    p_status,
    p_sect,
    education,
    fin_status,
    country,
    state,
    district,
    place,
    about,
    user_id,
  };
  console.log(partnerObj);
  partner.create(partnerObj,async (err, data) => {
    if (data) {
      console.log(data);
      let d=await user.findOneAndUpdate({_id:user_id},{s3:true},{ useFindAndModify: false })
        if(d){
      res.redirect("/user/profile_photo");

         
        }
        else{
          res.redirect("/user/partner_Preference");

        }
     
    } else {
      res.redirect("/user/partner_Preference");

    }
  });

}
else{
  res.redirect('/user/login')
}
};


exports.emailVerify=async function(req,res){

  if(req.cookies){

     let id=req.cookies.userid;
     let d=await user.findOne({_id:id});

    
     let email=d.email;
     console.log(email);
     const OTP=otp.generateOTP();
    

     var mailOptions = {
      from: "visakhsanthosh69@gmail.com",
      to: email,
      subject: "From Muslim Matrimony",
      text:"Your OTP is-"+OTP
    };

    var transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visakhsanthosh69@gmail.com",
        pass: "427799@TVS",
      },
    });

    let info=await transport.sendMail(mailOptions);
    if (info) {


      let d4=await user.findOneAndUpdate({_id:id},{otp:OTP}, { useFindAndModify: false })
      if(d4){
        console.log("mail send")
        res.render('user_views/email_verification')
      }
  
       
      } else {

        console.log(error);
        res.render('user_views/email_verification')
       
      }
 
  } else {
    res.render('user_views/email_verification')
  




  }
  


}


exports.verifyEmail=async function(req,res){

  console.log(req.body);
let {otp}=req.body.data;
    if(req.cookies){
      let id=req.cookies.userid;
      let d5=await user.findOne({_id:id});
      if(d5){

        console.log(otp ,d5.otp)
         if(otp==d5.otp){
                 let d6=await user.findOneAndUpdate({_id:id},{email_verified:true})
                  if(d6){
                    res.json({"success":true})
                  }
                  else{
                  res.json({"success":false,"message":"Something went wrong try again later"})
        
                  }
          }
          
         
         else{
        
          res.json({"success":false,"message":"Otp is not correct"})
         }
      }

      else{
        res.json({"success":false,"message":"Something went wrong try again later"})
      }
    }
}



exports.checkPhone=async (req,res)=>{
  // console.log(req.body);
  let data=req.body.phone;



  let data1=await user.findOne({phone:data.phn});
  if(data1){
    
    res.json({
      "success":true,
      "message":"This phone number already exist..!!"
    })
  }else{
    res.json({
      "success":false,
      "message":""
    })
  }
  
  
}
exports.checkEm=async (req,res)=>{
  // console.log(req.body);
  let data=req.body.email;



  let data1=await user.findOne({email:data.em});
  if(data1){
    
    res.json({
      "success":true,
      "message":"This email  already exist..!!"
    })
  }else{
    res.json({
      "success":false,
      "message":""
    })
  }
  
  
}