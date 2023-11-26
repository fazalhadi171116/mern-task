const express = require('express');

const user_route = express.Router();
const verifyToken = require('../middleware/auth')

const user_controller = require('../controllers/userController')


user_route.post('/signup',user_controller.signup)
user_route.post('/login',user_controller.login)
user_route.post('/checktoken',verifyToken,(req,res)=>{
res.status(200).send({success:true,msg:"Token valid"})
})

module.exports = user_route;