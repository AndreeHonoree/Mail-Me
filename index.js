import express from 'express';
import bodyParser from 'body-parser';
import route from './routes';




const app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/',route);


const port = process.env.PORT || 3000;
app.listen(3000, () => console.log(`Listening on port ${port}.....`))