var express = require("express");
var router = express.Router();
var C_Codes = require("../utils/datas");
var Auth = require("../controllers/AuthController");
var Verify = require("../controllers/MiddleWaresController"); //Middleware for token verify
var ShowProf = require("../controllers/ShowAllprofileController");
let EditProf= require("../controllers/EditProfileController");

/* GET home page. */
const newArr = C_Codes.CountryCodes();
const heights = C_Codes.Heights();
const weights = C_Codes.Weights();
const countries = C_Codes.ListOfCountries();


router.get("/", Verify, ShowProf.showAllProfile);

router.get("/user/register", function (req, res, next) {
  res.render("index", { title: "Express", newArr });
});
router.get("/user/login", Verify, function (req, res, next) {
  res.redirect("/");
});
router.get("/user/my_profile", Verify, ShowProf.ShowProfile);
router.get("/user/profile/:id",Verify,ShowProf.showUserProfile);
router.get("/user/edit_profile",Verify,(req,res)=>{
  let img=req.cookies.user_img;
  let pr_id=req.cookies.pr_id;
  res.render("user_views/edit_profile",{heights,weights,img,pr_id,newArr});
})
// router.get('/edit_profile_image',(req,res)=>{
//   res.render('user_views/edit_profile_image')
// })
router.get("/user/complete_profile1", function (req, res, next) {
 

  res.render("user_views/complete_profile1", { heights, weights });
});
router.get("/user/complete_profile2", function (req, res, next) {
 

  res.render("user_views/complete_profile2", { countries, newArr });
});


router.get('/user/partner_preference',(req,res)=>{
  res.render("user_views/partner_preference",{ heights, weights})
})
router.get('/user/profile_photo',(req,res)=>{
  res.render("user_views/profile_photo")
})
router.get("/user/logout", Auth.Logout);
router.get("/user/delete_account",Verify,(req,res)=>{
  let u_id=res.user.id;
  res.render("user_views/delete_account",{u_id});

})
router.post("/register", Auth.Register);
router.post("/login", Auth.Login);
router.post("/complete_profile1", Auth.Complete_profile1);
router.post("/complete_profile2", Auth.Complete_profile2);
router.post("/partner_preference", Auth.Partner_preference);
router.post("/profile_photo",Auth.Profile_photo);
router.post("/edit_profile",EditProf.EditProfile);
router.post("/edit_profile_pic",Verify,EditProf.EditProfilePic);
router.post("/delete_account",Verify,EditProf.deleteAccount);
module.exports = router;
