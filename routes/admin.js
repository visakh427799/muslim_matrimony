const express = require('express');
const router =express.Router();
const adminLog= require('../controllers/admin/AuthController');
const adVerify= require('../controllers/admin/Middleware');
const extra = require('../models/user_details_2')
router.get('/login',(req,res)=>{

    res.render('admin_views/admin_login');
})

router.get('/all_profiles',adVerify,async (req,res)=>{
    let d=await extra.find({}).lean();
    if(d){
        console.log(d)
    }


    res.render('admin_views/all_profiles',{d});
})


router.post('/login',adminLog.adminLogin);
router.post('/approve',adminLog.approve);

module.exports=router;