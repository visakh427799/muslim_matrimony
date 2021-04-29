const mongoose =require('mongoose');
const Schema   = mongoose.Schema;

const consultShema=new Schema({
    name:{ type: String, default: null },
    phone:{ type: String, default: null },
    time:{ type: String, default: null },
    reason:{ type: String, default: null },




})

const consult=mongoose.model('consult',consultShema);
module.exports=consult;