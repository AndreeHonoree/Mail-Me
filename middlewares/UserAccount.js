import Joi from 'joi';
import db from '../database/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {INTERNAL_SERVER_ERROR, UNAUTHORISED} from '../statusCode';

export const CheckExistingUser = async (req, res, next) => {
    const { name, email } = req.body;
    
    const user = await db.User.findOne({where: {name,email}});

    if(user){
        return res.status(208).send({
        status: 208,
        message:'User added already exists'
    })}
    else{
       return next();
    } 

}


export const validateCreatedUser = (req, res, next) => {
    const {error} = validateUser(req.body);
    if(error){
        return res.status(400).send({
            status:400,
            message:error.details[0].message});
    }
    else{
        next();
    }
}

function validateUser(user){
    const schema = {
        name: Joi.string().min(5).required(),
        email: Joi.string().required(),
        password: Joi.string().min(10).required(),
      
       
    };
    return Joi.validate(user, schema);
}


export const checkUserId = async (req, res, next) => {
    const user = await db.User.findOne({where:{id:req.params.id}});
    
    if(user){
        return next();
    }
    else {
        res.status(404).send({status:404,mesage:'User not found'});
    }
}


export const checkUserLogin = async (req, res, next) => {
    const {email,password} = req.body;

    if(email && password){

        const user = await db.User.findOne({where:{email:req.body.email,}});
        if(user){
          const passwordIsValid = await bcrypt.compareSync(req.body.password, user.password);
          if(passwordIsValid){
            next();
          }
          else{
            res.status(401).send({ message:'Password is not valid', auth: false, token: null })
          } 
        }
        else{
          res.status(404).send({message:'User not found! You entered incorrect email or password'});
        } 
        }
    else{
        res.status(404).send({message:'Please enter email and password or go to sign for registration'});
        res.end();
    }
}


export const authAccess = async (req, res, next) => {
    const token = await req.headers['x-access-token'];
    if (!token) 
      res.status(UNAUTHORISED).send({ auth: false, message: 'No token provided.'
    });
    
    else{
        const decoded = await jwt.verify(token, process.env.secretkey);
        req.currentUser = decoded;
        if(decoded){
            next();
        }
        else{
            res.status(INTERNAL_SERVER_ERROR).send({
              status: INTERNAL_SERVER_ERROR,
              message: 'Failed to authenticate the token', auth: false 
            });
        }
    }
    
}


