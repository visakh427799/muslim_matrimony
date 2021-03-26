const mongoose= require('mongoose');

const Schema = mongoose.Schema;

const partnerShema=new Schema({


    age_from:{type:String,default:'18'},
    age_to:{type:String,default:'35'},
    height:{type:String,default:'5.5ft -167cm'},
    weight:{type:String,default:'60'},
    m_status:{type:Array,default:['Any']},
    p_status:{type:Array,default:['Any']},
    p_sect:{type:Array,default:['Any']},
    education:{type:Array,default:['Any']},
    fin_status:{type:Array,default:['Any']},
    country: { type: String, default: 'Any' },
    state: { type: String, default: 'Any' },
    district: { type: String, default: 'Any' },
    place: { type: String, default: 'Any' },
    about: { type: String, default:null },
    user_id:{ type: String, default: null },


})

const partner= mongoose.model('partner',partnerShema);
module.exports=partner;