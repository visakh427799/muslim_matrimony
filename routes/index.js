var express = require("express");
var router = express.Router();
var C_Codes = require("../utils/datas");
var Auth = require("../controllers/AuthController");
var Verify = require("../controllers/MiddleWaresController"); //Middleware for token verify
/* GET home page. */
const newArr = C_Codes.CountryCodes();
router.get("/", function (req, res, next) {
 

  res.render("index", { title: "Express", newArr });
});
router.get("/user/profile",Verify, function (req, res, next) {
 
  if(res.user){
    let id=res.user.id;
    res.render("user_views/user_profile",{id});
  }
 
});

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
router.post("/complete_profile1", Auth.Complete_profile1);
router.post("/complete_profile2", Auth.Complete_profile2);
module.exports = router;
