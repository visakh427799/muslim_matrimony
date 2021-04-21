const mongoose = require("mongoose");

const userDetailSchema_1 = new mongoose.Schema({
  marital_status: { type: String, default: null },
  children: { type: String, default: null},
  no_children: { type: String, default: null },
  dob: { type: String, default: null },
  height: { type: String, default: null },
  weight: { type: String, default: null },
  religion: { type: String, default: null },
  sect: { type: String, default: null },
  complexion: { type: String, default: null },
  body_type: { type: String, default: null },
  physical_status: { type: String, default: null },
  mother_tongue: { type: String, default: null },
  education: { type: String, default: null },
  job: { type: String, default: null },
  user_id: { type: String },
});

const personal = mongoose.model("personal", userDetailSchema_1);
module.exports = personal;
