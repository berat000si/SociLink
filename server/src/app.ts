import express,{Request,Response} from 'express';
import bodyParser from 'body-parser';
import cors from "cors"


import connectDB from './database/config';

import userRouters from './routes/userRouters';
import postRouters from './routes/postRouters';


import errorHandler from './middlewares/errorHandler';



const app = express();

connectDB();

app.use(cors());
app.use(express.json({limit:"10mb"}));
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: true }));


app.use('/user', userRouters);
app.use('/post', postRouters);


app.use(errorHandler);

export default app;

