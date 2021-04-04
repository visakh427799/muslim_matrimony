const user = require("../models/user_model");
const personal = require("../models/user_details_1");
const extra = require("../models/user_details_2");
const partner= require("../models/partner_preference")
const fs= require("fs");
exports.EditProfile=function(req,res){

   console.log(req.body);

}
exports.EditProfilePic=async function(req,res){

    console.log("let's update ");

    let { img } = req.files;
    let prevImage=req.cookies.user_img;
    const pathToFile=`./public/images/profile_images/${prevImage}`;
    console.log(pathToFile);
    fs.unlink(pathToFile, async function(err) {
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully deleted the file.")


          img.mv("./public/images/profile_images/" + img.name,async (err) => {
            if (err) return console.log(err);
            else {
              console.log("File uploaded");
        
              //db query mongo
        
              let user_id = res.user.id;
               console.log(user_id)
            await extra.findOneAndUpdate({user_id:user_id},{profile_pic:img.name},{useFindAndModify: false},(err,data)=>{
        
              if(err)    console.log(err)
              else{


                res.clearCookie("user_img");
                res.cookie("user_img",img.name);
                res.redirect("/user/edit_profile");
              }
            
          })
        }
      })


        }
      })

    // console.log(req.files);

   
    
     
}
exports.deleteAccount=async function(req,res){
 
  console.log(req.body);


  let d1=await user.deleteOne({_id:req.body.id});
  let d2=await personal.deleteOne({user_id:req.body.id});
  let d3=await extra.deleteOne({user_id:req.body.id});
  let d4=await partner.deleteOne({user_id:req.body.id});
  console.log(d1);

  //clear all cookies 
  
  //clear all collections

  if(d1&&d2&&d3&&d4){

  res.clearCookie("userid");
  res.clearCookie("user_token");
  res.clearCookie("user_img");
  res.clearCookie("pr_id");
   
  
  res.json({
      "delete":true
    })
  
  }


  
}