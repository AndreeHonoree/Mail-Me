import express from 'express';
import users from './UserAccount';
import articles from './Articles';
import comments from './Comments';
import groups from './Groups';


const route = express.Router();

route.use('/api', users);
route.use('/api', articles);
route.use('/api', comments);
route.use('/api', groups);


export default route;