const jwt =require('jsonwebtoken')
const tokenVerify=async(req,res,next)=>{

   let token=req.cookies.user_token;
//    console.log(token)
   if(token===undefined){
            console.log("No token ")
            res.render('user_views/user_login')
    }

else{
            

     jwt.verify(token,'shhhh',(err,decoded)=>{
       if(err){
             console.log("Token validity expired")
             res.render('user_views/user_login')
       }
       else{
            console.log(decoded)
             //console.log("Already logged in  go to next page");
             //let email=""
             res.user=decoded;
           
             next();
       }

 });
 


}
        



  

}
module.exports=tokenVerify;