const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner = require("../models/partner_preference");
const shortlist =require('../models/shortlisted_profiles');

exports.ShowProfile = async function (req, res, next) {
  if (res.user) {
    console.log(res.user);
    let id = res.user.id;
    let data = await user.findOne({ _id: id });
    let { _id, role, uname, gender, phone, email, profile_id } = data;
    let data2 = await personal.findOne({ user_id: id });
    let data3 = await extra.findOne({ user_id: id });
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
    };

    let userPrefer = { ...data4 };
    userPrefer = userPrefer._doc;
    // console.log(userPrefer)
    res.cookie("user_img", pro_img);
    res.cookie("pr_id", profile_id);

    res.render("user_views/user_profile", {
      userObj,
      userExtra,
      userPrefer,
    });
  }
};

exports.showAllProfile = async function (req, res) {
  let data = await extra.find({}).lean();
  console.log(data);

  res.render("user_views/all_profiles", { data });
};

exports.showUserProfile = async function (req, res) {
  if (req.params.id) {
    console.log(req.params.id);
    let id = req.params.id;
    let data = await user.findOne({ _id: id });
    let { _id, role, uname, gender, phone, email, profile_id } = data;
    let data2 = await personal.findOne({ user_id: id });
    let data3 = await extra.findOne({ user_id: id });
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
    } = data3;
    if (profile_pic_status == "Inactive") {
      profile_pic = "";
    }

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
    };

    let userPrefer = { ...data4 };
    userPrefer = userPrefer._doc;

    res.render("user_views/profile", {
      userObj,
      userExtra,
      userPrefer,
    });
  }
};


exports.shortlisted=async function(req,res){
  let u_id=res.user.id;
  let users=[];
  let d1=await shortlist.findOne({user_id:u_id});
  if(d1){
    let arr=d1.shortlisted;

 
    arr.forEach(async (elm)=>{
     

      let d2=await extra.findOne({user_id:elm})
     
      users=[...users,d2];

      //console.log(users);
    })
   
 
   

   
  }



}
