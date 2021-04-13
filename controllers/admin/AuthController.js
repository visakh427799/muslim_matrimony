const express = require('express');
const jwt     = require('jsonwebtoken');
const tokenCreate = require('../../utils/tokeCreate');
exports.adminLogin= function (req,res){

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