const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");

exports.ShowAllprofile = async function (req, res, next) {
  if (res.user) {
    console.log(res.user);
    let id = res.user.id;
    let data = await user.findOne({ _id: id });
    const { _id, role, uname, gender } = data;
    let data2 = await personal.findOne({ user_id: id });
    let arr = [];
    //   let arr2=[];
    arr = [data2];
    console.log(arr);
    const { dob, religion, sect } = data2;
    res.render("user_views/user_profile", {
      _id,
      role,
      uname,
      gender,
      dob,
      religion,
      sect,
    });
  }
};
