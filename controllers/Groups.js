import db from '../database/models';
import { CREATED, OK, FOUND } from '../statusCode';




export default class Group {
    static async createGroup (req, res) {
        const group = await db.Group.create({
            groupName : req.body.groupName, 
            groupDescription : req.body.groupDescription, 
            userId : req.body.userId   
        })
        res.status(OK).send({
            status: CREATED,
            message: 'Group was successfully created!', group
        })
    }


    static async getAllGroups (req, res) {
        const groups = await db.Group.findAll({});
        res.status(OK).send({
            status: FOUND,
            message: 'All groups created are displayed', groups 
        })
    }


    static async getGroupById (req, res) {
        const group = await db.Group.findOne({where: {id: req.params.id}})
        res.status(FOUND).send({
            status: FOUND,
            message: 'Group with specified ID was found!', group
        })
    }


    static async updateGroup (req, res) {
        const updateGroup = await db.Group.update(req.body, {where : {id: req.params.id}});
        const group = await db.Group.findOne({where : {id: req.params.id}})
        res.status(OK).send({
            status: OK,
            message: 'Group with specified ID was successfully updated!', group
        })
    }


    static async deleteGroup (req, res) {
        const group = await db.Group.destroy({where : {id: req.params.id}})
        res.status(OK).send({
            status: OK,
            message: 'Group was successfully deleted!'
        })
    }
}