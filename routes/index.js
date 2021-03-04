var express = require('express');
var router = express.Router();
var C_Codes = require('../utils/datas');
var Auth    = require('../controllers/AuthController');
/* GET home page. */
router.get('/', function(req, res, next) {
   const newArr=C_Codes.CountryCodes();
   
  res.render('index', { title: 'Express',newArr });
});

router.get('/complete_profile1', function(req, res, next) {
 
  const heights=C_Codes.Heights();
  const weights=C_Codes.Weights();
  // console.log(heights)

 res.render('user_views/complete_profile1',{heights,weights});

});
router.get('/complete_profile2', function(req, res, next) {
 

  res.render('user_views/complete_profile2');
 });


 router.post('/register',Auth.Register);
 router.post('/complete_profile1',Auth.Complete_profile1);
module.exports = router;
