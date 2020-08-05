import express from 'express' ;
import bodyParser from 'body-parser';
import NewUser from '../controllers/UserAccount';
import {CheckExistingUser, validateCreatedUser, checkUserId, checkUserLogin, authAccess } from '../middlewares/UserAccount';




const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const routes = express.Router(); 

routes.get('/users', authAccess, NewUser.getAllUsers);
routes.post('/users/signUp', CheckExistingUser, validateCreatedUser , NewUser.registerUser);
routes.get('/users/:id',checkUserId, NewUser.getUserById);
routes.put('/users/:id', checkUserId, NewUser.updateUser);
routes.delete('/users/:id',checkUserId, NewUser.deleteUser);
routes.post('/users/login',checkUserLogin, NewUser.userLogin);

export default routes;