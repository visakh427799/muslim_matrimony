const mongoose = require('mongoose');
const uri=process.env.URI;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err));