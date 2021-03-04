const user = require("../models/user_model");
var C_Codes = require("../utils/datas");

exports.Register = async function (req, res) {
  const { role, uname, gender, phonenum, code, email, password } = req.body;
  let phone = code + phonenum;
  let status = "Active";
  let newUser = { role, uname, gender, phone, email, password, status };
  let newArr = C_Codes.CountryCodes();
  // console.log(newObj);
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
        res.redirect("/complete_profile1");
      }
    });
  }
};

exports.Complete_profile1=function(req,res){
    console.log(req.body);
}