 const bcrypt =require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/User.js');
const JWT_SECRET= 'your_jwt_secret';

const signup =async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message: 'Email and Password are required'});
        }
        if(await User.findOne({email})){
            return res.status(400).json({message: 'User already exists'});
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user= new User({email,password: hashedPassword });
        await user.save();
        res.status(210).json({message: 'User Created'});
    }
    catch(error){
        res.status(500).json({message: 'Internal Server Control'});
    }
};

const signin =async(req,res)=>{
    try{
        const {email,password}=req.body;
        if(!email||!password){
            return res.status(400).json({message: 'Email and Password are required'});
        }
    const user= await User.findOne({email});
     
    if(!user||!(await bcrypt.compare(password,user.password)))
    {
        return res.status(400).json({message: 'Invalid credentials'});
    }
    const token= jwt.sign({email},JWT_SECRET,{expiresIn: '1h'});
    res.json({token});
}
catch(error){
    res.status(500).json({message:'Internal Server Error'});
}
};
module.exports={signup,signin};
