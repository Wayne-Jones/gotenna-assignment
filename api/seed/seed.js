const readline = require('readline');
const fs = require('fs');

import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Photo from '../model/Photo';

dotenv.config();
const hostname = process.env.DB_HOST;
const username = process.env.DB_USER;
const password = process.env.DB_PASS;
const dbName = process.env.DB_NAME;
const dbOptions = process.env.DB_OPTIONS;

//MongoDB Connection
mongoose.Promise = global.Promise;
const uri = `mongodb+srv://${username}:${password}@${hostname}/${dbName}?${dbOptions}`;
mongoose.connect(uri,  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});


const processFile = (filePath) => {
    let jsonBody = [];
    
    let lines = fs.readFileSync(filePath, 'utf-8').split('\r\n');
    for(let i = 0; i<lines.length; i++){
        let json = parseUrl(lines[i]);
        jsonBody.push(json);
    }

    return jsonBody;
}

const parseUrl = (url)=> {
    const myURL = new URL(url);
    let baseUrlHostName = myURL.origin;
    baseUrlHostName = baseUrlHostName.concat("/id/");
    
    let pathName = myURL.pathname;
    let pathArray = pathName.split("/");
    let idNum = pathArray[2];
    let width = pathArray[3];
    let height = pathArray[4];

    let imageObj = { url: baseUrlHostName, photoID: idNum, width: width, height: height};
    return imageObj;
}
const filePath = './seed/photoURL.csv';
let jsonBodyReq = processFile(filePath);

Photo.insertMany(jsonBodyReq)
.then(() => {
    console.log("Database seeding complete. You may shut down nodemon.");
})
.catch(err => {
    console.log(err)
})
