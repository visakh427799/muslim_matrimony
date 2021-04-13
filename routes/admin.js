const express = require('express');
const router =express.Router();
const adminLog= require('../controllers/admin/AuthController');
const adVerify= require('../controllers/admin/Middleware');
router.get('/login',(req,res)=>{

    res.render('admin_views/admin_login');
})

router.get('/all_profiles',adVerify, (req,res)=>{

    res.render('admin_views/all_profiles');
})


router.post('/login',adminLog.adminLogin)

module.exports=router;