const user = require("../models/user_model");
const C_Codes = require("../utils/datas");
const tokenCreate= require('../utils/tokeCreate');

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


      
        let token=tokenCreate.CreateToken({email:email,id:data._id},'shhhh');
        res.cookie('usertoken',token);
        // console.log(token)
        res.redirect("/complete_profile1");
      }
    });
  }
};

exports.Complete_profile1=function(req,res){
    console.log(req.body);
    if(res.user){
      let userdata=res.user;
      let id=userdata.id;
   
    let personal={...req.body,id}
    console.log(personal);
  res.redirect('/complete_profile2')  ;
}  
}