import express from 'express' ;
import bodyParser from 'body-parser';
import NewArticle from '../controllers/Articles';
import {checkExistingArticle, validateCreatedArticle, checkArticleId, checkUserId} from '../middlewares/Articles';



const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = express.Router(); 




routes.post('/articles/post', checkExistingArticle, validateCreatedArticle, NewArticle.postArticle);
routes.get('/articles', NewArticle.getALLArticles);
routes.get('/articles/:id', checkArticleId, NewArticle.getArticleById);
routes.get('/userarticles/:id', checkUserId, NewArticle.getArticlesByUserId);
routes.put('/articles/:id', checkArticleId, NewArticle.updateArticle);
routes.delete('/articles/:id/:userId', checkArticleId, checkUserId, NewArticle.deleteArticle);




export default routes;