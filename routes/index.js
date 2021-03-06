var express = require("express");
var router = express.Router();
var C_Codes = require("../utils/datas");
var Auth = require("../controllers/AuthController");
var Verify = require("../controllers/MiddleWaresController"); //Middleware for token verify
var ShowAll = require('../controllers/ShowAllprofileController');
/* GET home page. */
const newArr = C_Codes.CountryCodes();

router.get("/",Verify,function (req, res, next) {
 

  res.render('user_views/all_profiles');
});

router.get("/register", function (req, res, next) {
 

  res.render("index",{ title: "Express", newArr });
});
router.get("/login",Verify,function (req, res, next) {
 

  res.redirect('/');
});
router.get("/profile",Verify,ShowAll.ShowAllprofile);

router.get("/complete_profile1", function (req, res, next) {
  const heights = C_Codes.Heights();
  const weights = C_Codes.Weights();
 
  res.render("user_views/complete_profile1", { heights, weights });
});
router.get("/complete_profile2", function (req, res, next) {

  const countries=C_Codes.ListOfCountries();

  res.render("user_views/complete_profile2",{countries,newArr});
});

router.post("/register", Auth.Register);
router.post("/login", Auth.Login);
router.get("/logout", Auth.Logout);
router.post("/complete_profile1", Auth.Complete_profile1);
router.post("/complete_profile2", Auth.Complete_profile2);
module.exports = router;
