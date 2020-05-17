import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();
const app = express();

const router = require('./routes/index');


const port = process.env.PORT || 4000;
const hostname = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbOptions = process.env.DB_OPTIONS;

app.get('env');

app.use(cors());
app.use(logger('dev'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//MongoDB Connection
mongoose.Promise = global.Promise;
const uri = `mongodb+srv://${username}:${password}@${hostname}/${dbName}?${dbOptions}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

app.use(router);
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
