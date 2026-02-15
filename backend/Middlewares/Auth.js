const jwt = require('jsonwebtoken');
const ensureAuthenticated = (req , res , next ) =>{
    const auth = req.headers['authorization'];
    if(!auth){
        return res.status(403).json({
            message:'Unauthorized , JWT  token is required',
        })
    }
    try{
        const token = auth.split(' ')[1];
        const decoded = jwt.verify(token , process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch(error){
        console.error(error);
        return res.status(401).json({
            message : 'Unauthorized , JWT is wrong or expired',
        })
    }
}
module.exports = ensureAuthenticated;