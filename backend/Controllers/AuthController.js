const UserModel = require("../Models/Users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const signup = async (req , res ) =>{
    try{
        //server side validation -> middlewares \
        const {name , email , password } = req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409).json({
                message:'User already exists',
                success : false,
            })
        }
        
        const userModel = new UserModel({name , email , password}); //take instance to hash
        userModel.password = await bcrypt.hash( password , 10); // hash 
        await userModel.save(); // save finally to db
        console.log("Signup  successfull hogya hai");
        res.status(201).json({
            message : 'signup successfully',
            success : true,
        })
    }
    catch(error){
        console.error(error);
        res.status(500).json({
            message: ' internal server error from signup',
            success : false,
            error,
        })
    }
}



const login = async (req , res ) =>{
    try{
        //server side validation -> middlewares \
        const { email , password } = req.body;
        const user = await UserModel.findOne({email});
        const errMsg = 'Login Failed , Email or Pasword is wrong';

        if(!user){
            return res.status(403).json({
                message: errMsg,
                success : false,
            })
        }

        const isPassEqual = await bcrypt.compare( password , user.password);

        if(!isPassEqual){
                return res.status(403).json({
                message:errMsg,
                success : false,
            })
        }

        const jwtToken = jwt.sign(
            {email : user.email ,  _id : user._id } ,
            process.env.JWT_SECRET,
            {expiresIn : '6h'}
        )  

        res.status(200).json({
            message : 'login successfully',
            success : true,
            jwtToken,
            email,
            name : user.name
        })
    }
    catch(error){
        res.status(500).json({
            message: ' internal server error from signup',
            success : false,
            error,
        })
    }
}

module.exports = {signup , login}