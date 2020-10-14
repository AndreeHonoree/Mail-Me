import db from '../database/models';
import {CREATED, OK, FOUND, NOT_FOUND} from '../statusCode';



export default class NewArticle {

  static async postArticle (req, res){
    const article = await db.Article.create({
      title: req.body.title,
      content: req.body.content,
      userId: req.body.userId 
    })
      res.status(CREATED).send({
        message:'Article posted successfully', article
      });
    
  } 


  static async getALLArticles ( req, res) {
    const articles = await db.Article.findAll({});
    res.status(OK).send({message:'All articles posted', articles});
  }


  static async getArticleById ( req, res) {
    const article = await db.Article.findOne({where: {id: req.params.id}});
    res.status(FOUND).send({
      status:FOUND,
      message:'Article found', article});
  }


  static async getArticlesByUserId ( req, res) {
    
    const articles = await db.Article.findAll({where: {userId: req.params.id}});
    res.status(OK).send({
      status: OK,
      message:'Articles posted by specified user are:', articles
    });
  }


  static async updateArticle (req, res) {
    const updateArticle = await db.Article.update(req.body, 
      { where:{id:req.params.id}
    });
    const article = await db.Article.findOne({where:{id:req.params.id}})
    res.status(OK).send({
      status:OK, message:'This article has been modified', article
    });
  }

  static async deleteArticle (req, res) {
    const article = await db.Article.destroy({where:{id:req.params.id}&&{userId:req.params.id}})
    res.status(OK).send({
      status:OK, message:'This article has been deleted', article
    });
  }
}