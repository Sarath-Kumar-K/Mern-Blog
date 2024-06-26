import jwt from 'jsonwebtoken';
import { errorHandler } from './error.js';

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(errorHandler(400,'Unauthorized token not exsists'));
    }
    jwt.verify(token,process.env.JWT_SECRET, (err,user) => {
        if(err){
            return next(errorHandler(400,'Unauthorized'));
        }
        console.log(user);
        req.user = user;
        next();
    })
}