const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

let shortListSchema=new Schema({

    
    shortlisted:{type:Array},
    user_id: {type:String }
})
const shortlist=mongoose.model('shortlist',shortListSchema);
module.exports=shortlist;