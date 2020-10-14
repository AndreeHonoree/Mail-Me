import Joi from 'joi';
import db from '../database/models';
import {ALREADY_EXISTS, BAD_REQUEST, NOT_FOUND} from '../statusCode';



export const checkExistingArticle = async (req, res, next) => {
    const {title, content, userId} = req.body
    const article = await db.Article.findOne({where:{title, content, userId}})
    if(article){
        res.status(ALREADY_EXISTS).send({mesage:'Article you are posting is already posted', article});
    }
    else{
        next();
    }
}


export const validateCreatedArticle = async (req, res, next) => {
    const {error} = await validateArticle(req.body);
    if(error){
        res.status(BAD_REQUEST).send({
            status: BAD_REQUEST,
            messade: error.details[0].message
        });
    }
    else{
        next();
    }
}

function validateArticle(article){
    const schema ={
        title :Joi.string().required(),
        content : Joi.any().allow('text').required(),
        userId: Joi.number().integer().required()
    }
   return Joi.validate(article, schema);
}


export const checkArticleId = async (req, res, next) =>{
    const article = await db.Article.findOne({where:{id:req.params.id}})
    if(article){
       next();
    }
    else{
        res.status(NOT_FOUND).send({
            status:NOT_FOUND,
            message:'Article with a specified ID was not found'
        })
    }
}

export const checkUserId = async (req, res, next) => {
    const user = await db.Article.findOne({where: {userId: req.params.id}});
    if(user){
        next();
    }
    else{
        res.status(NOT_FOUND).send({
            status: NOT_FOUND,
            message: 'User with specified Id did not post any article!'
          })
    }
}
