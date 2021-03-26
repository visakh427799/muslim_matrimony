const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner=require("../models/partner_preference")

exports.ShowAllprofile = async function (req, res, next) {
  if (res.user) {
    console.log(res.user);
    let id = res.user.id;
    let data = await user.findOne({ _id: id });
    let { _id, role, uname, gender,phone,email,profile_id,profile_pic,profile_pic_status} = data;
    let data2 = await personal.findOne({ user_id: id });
    let data3= await extra.findOne({user_id: id});
    let data4= await partner.findOne({user_id: id})
    const { dob, religion, sect,height,weight,marital_status,children,no_children,complexion,body_type,job,physical_status,mother_tongue,education } = data2;
    // const{country,state,place,district,financial_status,home_type,father_details,mother_details,no_sisters,no_brothers,address }=data3;
    if(profile_pic_status=="Inactive"){
      profile_pic=""
    }


    let userObj={
      _id:_id,
      uname:uname,
      role: role,
      dob:dob, 
      gender:gender,
      phone: phone,
      religion:religion,
      email: email,
      sect:sect,
      profile_id:profile_id,
      profile_pic:profile_pic,
      height:height,
      weight:weight,
      marital_status:marital_status,
      children:children,
      no_children:no_children,
      complexion:complexion,
      body_type:body_type,
      physical_status:physical_status,
      mother_tongue:mother_tongue,
      education:education,
      job:job,
      
    }

    let userExtra={...data3};
    
    userExtra=userExtra._doc;

    let userPrefer={...data4};

    
    res.render("user_views/user_profile", {
    
      userObj,userExtra

    });
  }
};
