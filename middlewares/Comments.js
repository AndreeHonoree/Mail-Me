import db from '../database/models';
import {NOT_FOUND} from '../statusCode';



export const checkArticleId = async (req, res, next) => {
    const article = await db.Comment.findOne({where: {articleId: req.params.id}});

    if(article){
        next();
    }
    else{
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message:'Article with specified Id was not found! So, it cannot be commented'
        })
    }
}

export const checkCommentId = async (req, res, next) => {
    const comment = await db.Comment.findOne({where:{id:req.params.id}})
    if(comment){
        next();
    }
    else{
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'Comment with specified Id was not found'
        })
    }
}