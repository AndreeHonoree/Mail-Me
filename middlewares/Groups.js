import db from '../database/models'
import { NOT_FOUND, ALREADY_EXISTS } from '../statusCode'



export const checkUserRegistration = async(req, res, next) => {
    const user = await db.User.findOne({where: {id:req.body.userId}})
    if(user){
        next();
    }
    else {
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'User not registered is not allowed to crate a group'
        })
    }
}


export const checkExistingGroup = async (req, res, next) => {
    const {groupName, groupDescription, userId} = req.body

    const group = await db.Group.findOne({where : {groupName, groupDescription, userId}})
    if(!group){
       next(); 
    }
    else {
        res.status(ALREADY_EXISTS).send({
            status: ALREADY_EXISTS,
            message: 'That group is already exist', group
        })
    }
}


export const checkGroupId = async (req, res, next) => {
    const group = await db.Group.findOne({where : {id:req.params.id}})
    if(group){
        next()
    }
    else{
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'Group with specified Id was not found!'
        })
    }
}