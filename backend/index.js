const express = require('express');
const mongoose = require('mongoose')
const app = express();
const user_routes = require('./routes/userRoute')
const bodyParser = require('body-parser');
const cors = require('cors');



const PORT = process.env.PORT || 8000;

app.use(cors());
 app.use(bodyParser.urlencoded({ extended: true }));
 app.use(bodyParser.json());



mongoose.connect("mongodb://127.0.0.1:27017/USER_DB")

app.use('/api',user_routes)

app.listen(PORT,function(){
    console.log('Server is Running...',PORT)
})
