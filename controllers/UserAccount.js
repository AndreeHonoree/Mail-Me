import db from '../database/models';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {OK, CREATED, UNAUTHORISED} from '../statusCode';


export default class NewUser {

  static async registerUser (req, res){
    
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);

    const user =  await db.User.create({
      name : req.body.name,
      email : req.body.email,
      role: req.body.role,
      password : hashedPassword
    });
 
  const token = await jwt.sign({ id: user.id, name:user.name, role:user.role }, process.env.secretkey, 
      {expiresIn: 86400} 
    );
    res.status(OK).send({
      status: CREATED,
      message: 'User registered successfully', auth: true, token, user 
    });
  }

  static async userLogin (req, res) {
    const user = await db.User.findOne({where:{email:req.body.email,}});
    const token = await jwt.sign({id:user.id, name:user.name, role:user.role}, process.env.secretkey,{expiresIn:86400});

    res.status(OK).send({
      message:'User logged in successfully!', auth: true, data:{email:user.email, role:user.role}, token});
  }


  static async getAllUsers(req, res){
    const {currentUser} = req;
    if(currentUser.role === 'admin'){
      const users = await db.User.findAll({})
      res.status(OK).send({
      status: OK, 
      success: true,
      message:'You are authorised! All users from database are displayed here',auth:true, users});
    }
    else{
      res.status(401).send({
        status: UNAUTHORISED,
        message:"Current User is not authorised!"
      })
    }
  }
   
  
  static async getUserById(req,res){
    const user = await db.User.findOne({where:{id:req.params.id} })
      res.status(OK).send({
          status:OK,
          message: 'User found!', user});
  
  }


  static async updateUser (req,res) {
    const updatedUser = await db.User.update(req.body, {
      where: { id: req.params.id }
    });
   const user = await db.User.findOne({ where: { id: req.params.id } });
    
      return res.status(OK).send({ message:'User updated',user });
  }



  static async deleteUser (req, res) {
    const {currentUser} = req;
    if(currentUser.role === 'admin'){
      const user = await db.User.destroy({where:{id:req.params.id}});
      res.status(OK).send({message:'User deleted'});
    }
    else{
      res.status(401).send({
        status: UNAUTHORISED,
        message:"Current User is not authorised! Only admin allowed to delete user"
      })
    }
  }
}


