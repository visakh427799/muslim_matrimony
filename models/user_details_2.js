const mongoose = require('mongoose');

const userDetailSchema_2=new mongoose.Schema(
    {
        country: { type: String, default: null },
        state: { type: String, default: null },
        district: { type: String, default: null },
        place: { type: String, default: null },
        financial_status: { type: String, default: null },
        home_type:{ type: String, default: null },
        father_details: { type: String, default: null },
        mother_details: { type: String, default: null },
        no_sisters: { type: String, default: null },
        no_brothers: { type: String, default: null },
        address: { type: String, default: null },
        p_code: { type: String, default: null },
        phone_second: { type: String, default: null },
        w_code: { type: String, default: null },
        whatsapp_number: { type: String, default: null },
        about: { type: String, default: null },
        user_id:{ type: String, default: null },
      }
       
)

const extra=mongoose.model('extra',userDetailSchema_2);
module.exports=extra;




