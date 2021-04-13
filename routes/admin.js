const express = require('express');
const router =express.Router();

router.get('/login',(req,res)=>{

    res.render('admin_views/admin_login');
})

router.get('/all_profiles',(req,res)=>{

    res.render('admin_views/all_profiles');
})

module.exports=router;