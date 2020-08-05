import db from '../database/models';
import {CREATED, OK} from '../statusCode';




export default class NewComment {

    static async createComment (req, res) {
        const comment = await db.Comment.create({
            articleId: req.body.articleId,
            comment: req.body.comment,
            userId: req.body.userId
        });
        res.status(CREATED).send({
            status: CREATED,
            message: 'Comment posted', comment
        })
    }


    static async getAllComments (req, res) {
        
        const comments = await db.Comment.findAll({});
        res.status(OK).send({
            status: OK,
            message: 'All comments are displayed here!', comments
        });
    }

    static async getAllCommentsByArticle (req, res) {
        const comments = await db.Comment.findAll({where:{articleId : req.params.id}});
        res.status(OK).send({
            status: OK,
            message: 'All comments on article with specified Id are displayed here!', comments
        }); 
    }


    static async updateComment (req, res) {
        const updatecomment = await db.Comment.update(req.body, {where:{id:req.params.id}});
        const comment = await db.Comment.findOne({where:{id:req.params.id}})
        res.status(OK).send({
            status: OK,
            message: 'Comment updated', comment
        })
    }


    static async deleteComment (req, res) {
        const comment = await db.Comment.destroy({where: {id:req.params.id}})
        res.status(OK).send({
            status: OK,
            message:'Comment deleted successfully'
        })
    }
}