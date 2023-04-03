const mongoose = require('mongoose');
const config = require('./config');

mongoose.connect(config.MONGO_LOCAL_URL).then(()=>{
    console.log("Mongo db is connected !");
}).catch((err) => {
    console.log(err);
});