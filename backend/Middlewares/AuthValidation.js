const Joi = require('joi');

const signupValidation = (req , res , next) =>{
    // const {name , email , password } =req.body;
    const schema = Joi.object({
        
        name: Joi.string().min(3).max(100).required(),
        email:Joi.string().email().required(),
        password: Joi.string().min(4).max(100),
    });
    const { error } = schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:'Bad request',
            error,
        })
    }
    next();
}


const loginValidation = (req , res , next) =>{
    const schema = Joi.object({
        email:Joi.string().email().required(),
        password: Joi.string().min(4).max(100),
    });
    const { error } = schema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json({
            message:'Bad request',
            success:false,
        })
    }
    next();
}

module.exports = {signupValidation , loginValidation}