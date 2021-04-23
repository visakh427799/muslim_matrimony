
const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        
        role:{type:String,enum: ['My self', 'Parents','Sister','Brother'],default: null},
        uname: { type: String, default: null },
        gender:{type:String,default:null},
        phone: { type: String, default: null },
        code: { type: String, default: null },
        email: { type: String, default: null },
        password: { type: String, default: null },
        status: { type: String, enum: ['Active', 'Inactive'], default: null },
        profile_id:{type:String,default:null},
        otp:{type:Number,default:null},
        email_verified:{type:Boolean,default:false},
        created_at: { type: Date, default: Date.now },
        deleted_at: { type: Date, default: null },
        s1:{type:Boolean,default:false},
        s2:{type:Boolean,default:false},
        s3:{type:Boolean,default:false},
        s4:{type:Boolean,default:false},
})

const user=mongoose.model('user',UserSchema);
module.exports=user;