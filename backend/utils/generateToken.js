import jwt from 'jsonwebtoken';

import { ENV_VARS } from '../config/envVars.js';

export const generateTokenAndSetCookie=(userId,res)=>{
    const token=jwt.sign({userId},ENV_VARS.JWT_SECRET,{expiresIn:'10d'});

    res.cookie('jwt-netflix-token',token,{
        maxAge:10*24*60*60*1000,   //10 days in milLisecs
        httpOnly:true,    //acessible through browser only and not accessible through js
        sameSite:"strict",  //to prevent cross-site request forgery
        secure: ENV_VARS.NODE_ENV !== 'development'
    });

    return token;
};