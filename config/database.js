const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = ()=> {
    mongoose.connect(process.env.DATABASE_URL,{
         useNewUrlParser:true,
         useUnifiedTopology:true
    })
    .then(() => {console.log("connected successfully")})
    .catch(() => {console.log("issue in connection")
        console.log(error.message);
        process.env(1);
    })
}


module.exports = dbConnect;