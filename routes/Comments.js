import express from 'express';
import NewComment from '../controllers/Comments';
import {checkArticleId, checkCommentId} from '../Middlewares/Comments';

const routes = express.Router();


routes.post('/comments/post', NewComment.createComment);
routes.get('/comments', NewComment.getAllComments);
routes.get('/articlecomments/:id', checkArticleId, NewComment.getAllCommentsByArticle);
routes.put('/comments/:id', checkCommentId, NewComment.updateComment);
routes.delete('/comments/:id', checkCommentId, NewComment.deleteComment);




export default routes;