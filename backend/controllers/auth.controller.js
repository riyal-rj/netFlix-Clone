import bcryptjs from 'bcryptjs';

import { User } from "../models/user.model.js";
import { generateTokenAndSetCookie } from '../utils/generateToken.js';

export async function SignUp(req,res) {
    try {
        const {email,password,userName}=req.body;
        //checking for the mail and other cedentials given or not
        if(!email || !password || !userName)
            return res.status(400).json(
            {
                status:'Failed',
                message:'All fields are required'
            });
        //check for user existence by email
        const existingUserByEmail=await User.findOne({email:email});
        if(existingUserByEmail)
            return res.status(400).json(
        {
            status:'Error',
            message:'Email ID already exists'
        });
        //check for user existence by username
        const existingUserByUsername=await User.findOne({userName:userName});
        if(existingUserByUsername)
            return res.status(400).json(
        {
            status:'Error',
            message:'UserName already exists'
        });

        const Profile_Pics=["/avatar1.png", "/avatar2.png", "/avatar3.png","/avatar4.png"];
        const image=Profile_Pics[Math.floor(Math.random()*Profile_Pics.length)];

        const passcodeRegex=/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if(!passcodeRegex.test(password))
            return res.status(400).json({
                status:'Failed',
                message:'Password must contain at least one uppercase letter, one number, and one special character',
            });

        //create a hashed password
        const salt=await bcryptjs.genSalt(10);
        const hashedPassword=await bcryptjs.hash(password,salt);

        const newUser=new User({
            email:email,
            password:hashedPassword,
            userName:userName,
            image:image,
        });

        generateTokenAndSetCookie(newUser._id,res); 
        await newUser.save();
        res.status(201).json({
            status:'success',
            message:'Data sucessfully added to the database',
            user: {
				...newUser._doc,
				password: "",
			},
        });
    }
    catch (error) {
        console.log('Error in signup controller',error.message);
        res.status(500).json({
            status:'Failed to signup',
            message:error.message,
        });
    }
}
export async function Login(req,res) {
   try {
        const {email,password}=req.body;
        if(!email || !password)
            return res.status(400).json({
                status:'Failed',
                message:'Both email and password are required to login'
            });
        
        const user=await User.findOne({email:email}).select('+password');
        if(!user)
        {    return res.status(404).json({
                status:'Failed',
                message:'User does not exist or Invalid credentials entered.',
            });
        }
        const isPasswordCorrect=await bcryptjs.compare(password,user.password);
        if(!isPasswordCorrect)
        {    return res.status(400).json({
                status:'Failed',
                message:'Incorrect Password',
            });
        }
        generateTokenAndSetCookie(user._id,res);

        res.status(200).json({
			success: true,
			user: {
				...user._doc,
				password: "",
			},
		});

   } catch (error) {
        console.log('Error in login controller',error.message);
        res.status(500).json({
            status:'Failed to login',
            message:error.message,
        });
   }
}

export async function Logout(req,res) {
    try {
       res.clearCookie('jwt-netflix-token');
       res.status(200).json({
        status:'success',
        message:'User logged out successfully.'
       });
    } catch (error) {
        console.log('Error in logout controller',error.message);
        res.status(500).json({
            status:'Failed to logout',
            message:error.message,
        });
    }
}


export async function authCheck(req,res) {
    try {
        res.status(200).json({
            status:'Success',
            user:req.user
        });
    } catch (error) {
        console.log('Error in authCheck controller',error.message);
        res.status(500).json({
            status:'Failed',
            message:'Failed in authentication due to internal server error'
        })
    }
};