const express = require('express');
const jwt     = require('jsonwebtoken');
const tokenCreate = require('../../utils/tokeCreate');
const extra = require('../../models/user_details_2');
exports.adminLogin= async function (req,res){

  console.log(req.body);
 if(req.body.id=="admin"&&req.body.pass=="admin"){
     let secret="iamadmin";
     let obj={
         name:"admin"
     }
    let admin_token=tokenCreate.CreateToken(obj,secret);
    res.cookie("admin_token", admin_token);

  


    res.redirect('/admin/all_profiles');


 }
 else{
    let message="Invalid credentials..!!"
    res.render('admin_views/admin_login',{message});
 }

}

exports.approve=async function(req,res){

let data=req.body.obj
   
    let d = await extra.findOneAndUpdate({user_id:data.id},{profile_pic_status:true});
    if(d){
        res.json({"success":true})
    }
  else{
    res.json({"success":false})
  }



  
}