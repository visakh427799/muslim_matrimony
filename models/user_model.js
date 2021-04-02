
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        
        role:{type:String,enum: ['My self', 'Parents','Sister','Brother'],default: null},
        uname: { type: String, default: null },
        gender:{type:String,default:null},
        phone: { type: String, default: null },
        email: { type: String, default: null },
        password: { type: String, default: null },
        status: { type: String, enum: ['Active', 'Inactive'], default: null },
        profile_id:{type:String,default:null},
        created_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null },

})

const user=mongoose.model('user',UserSchema);
module.exports=user;