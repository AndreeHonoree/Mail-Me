import { CREATED } from "../statusCode"



export default class AddMember {

    static async addNewMember (req, res) {
        const member = await db.GroupMembers.create({
            userId: req.body.userId,
            groupId: req.body.groupId,
            role: req.body.role
        })
        res.status(CREATED).send({
            status: CREATED,
            message: 'User added successfully!', member
        })
    }
}