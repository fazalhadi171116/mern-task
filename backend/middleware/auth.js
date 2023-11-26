const jwt = require('jsonwebtoken');
const config = require('../config/config');

const verifToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token is missing' });
  }


  jwt.verify(token, config.secret_jwt, (err, user) => {
    if (err) {
      return res.status(403).json({ success: false, message: 'Invalid token' });
    }

    req.user = user;
    next(); // Pass control to the next middleware or route handler
  });
};

module.exports = verifToken;






























// const  jwt = require('jsonwebtoken')
// const config = require('../config/config')

// const verifToken = async(req,res,next)=>{

//    const token =  req.body.token || req.query.token || req.headers["authorization"]
//     if(!token){
//       return   res.status(200).send({success:false,msg:"A token is required for authentication"})
//     }
//     try {
//      const descode =jwt.verify(token,config.secret_jwt)
//     req.user = descode;
//     } catch (error) {
//      return  res.status(400).send({msg:"Token Invalid"}) 
//     }

//     return next();

// }
// module.exports = verifToken;