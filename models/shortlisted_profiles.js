const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let shortListSchema=new Schema({

    
  
    user_id: {type:String },
    partner_id:{type:String },
    partner_name:{type:String },
    partner_age:{type:String },
    partner_height:{type:String },
    partner_district:{type:String },
    partner_state:{type:String },
    partner_country:{type:String },
    partner_img:{type:String },

})
const shortlist=mongoose.model('shortlist',shortListSchema);
module.exports=shortlist;