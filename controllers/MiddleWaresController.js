const jwt =require('jsonwebtoken')
const tokenVerify=(req,res,next)=>{

   let token=req.cookies.user_token;
//    console.log(token)
   if(token===undefined){
            console.log("No token ")
           res.redirect('/');
    }

else{
            

 jwt.verify(token,'shhhh',(err,decoded)=>{
       if(err){
             console.log("Token validity expired")
             res.redirect('/');
       }
       else{
            console.log(decoded)
             //console.log("Already logged in  go to next page");
             //let email=""
             res.user=decoded;
            next()
            
       }

 });


}
        



   next();

}
module.exports=tokenVerify;