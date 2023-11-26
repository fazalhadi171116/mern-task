const User = require('../models/userModel');
const bcryptjs = require('bcryptjs')
const config = require('../config/config')
const  jwt = require('jsonwebtoken')

const create_token = async (id)=>{
  try {
    // Set the expiration time to 10 minutes from now
    const expirationTime = Math.floor(Date.now() / 1000) + 10 * 60;
 const token =  await  jwt.sign({_id:id, exp:expirationTime},config.secret_jwt)
 return token
  } catch (error) {
    res.status(400).send(error.message)
  }

}

const securePassword = async(password)=>{
    try {
      const passwordHash =   bcryptjs.hash(password,10)
      return passwordHash
        
    } catch (error) {
        res.status(400).send(error.message) 
    }
}
// signup method
const signup  = async(req,res)=>{
try {
    const spassword = await securePassword(req.body.password)
   const user =  new User({
        name:req.body.name,
        email:req.body.email,
        password:spassword,
    })
    const userData = await User.findOne({email:req.body.email})
    if(userData){
      res.status(200).send({success:false,msg:"This email is already exists"})
    }
    else{
      const user_data =  await user.save();
      res.status(200).send({success:true,massege:"Sign Up Successful",data:user_data})
    }
    
} catch (error) {
    res.status(400).send(error.message)
}
}

// login method
const login = async(req,res)=>{
    try {
      const email = req.body.email;
      const password = req.body.password;
      const userData = await User.findOne({email:email})
      if(userData){
     const passwordMatch = await bcryptjs.compare(password,userData.password)
     if(passwordMatch){
      const tokenData = await create_token(userData._id)
        const userResult = {
          _id:userData.id,
          name:userData.name,
          email:userData.email,
          password:userData.password,
          token:tokenData

        }
        const response = {
          success:true,
          msg:"Login Successful",
          data:userResult
        }
        res.status(200).send(response)
     }
     else{
      res.status(200).send({success:false,msg:"Login details are incorrect"})
     }
      }
      else{
        res.status(200).send({success:false,msg:"Login details are incorrect"})
      }


    } catch (error) {
      res.status(400).send(error.message)
    }
}





module.exports = {
    signup,
    login
}