const jwt = require("jsonwebtoken");
let secret="iamadmin"
const tokenVerify = async (req, res, next) => {
  let token = req.cookies.admin_token;
  //    console.log(token)
  if (token === undefined) {
    console.log("No token ");
    res.render("admin_views/admin_login");
  } else {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.log("Token validity expired");
        res.render("admin_views/admin_login");
      } else {
        console.log(decoded);
        //console.log("Already logged in  go to next page");
        //let email=""
        res.admin = decoded;

        next();
      }
    });
  }
};
module.exports = tokenVerify;
