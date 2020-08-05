import express from 'express';
import bodyParser from 'body-parser';
import Groups from '../controllers/Groups';
import {checkUserRegistration, checkExistingGroup} from '../middlewares/Groups'


const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = express.Router();

routes.post('/groups/NewGroup', checkUserRegistration, checkExistingGroup, Groups.createGroup);
routes.get('/groups', Groups.getAllGroups);
routes.get('/groups/:id', Groups.getGroupById);
routes.put('/groups/:id', Groups.updateGroup);
routes.delete('/groups/:id', Groups.deleteGroup);


export default routes;