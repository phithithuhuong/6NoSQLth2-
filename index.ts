import express from "express";
import bodyParser from "body-parser";
import * as mongoose from "mongoose";
import productRouter from "./src/router/product.router";

const app= express();
app.set('view engine','ejs')
app.set('views','./src/views');
app.use(bodyParser.json());
const DB_URL ='mongodb://127.0.0.1:27017/dbTest';
mongoose.connect(DB_URL).then(()=>{
    console.log('Connection mongoDB success !')
}).catch(err=>{
    console.log(err,"Error !")
})
app.use('/product',productRouter)
app.listen(3212,()=>{
    console.log('http://localhost:3212')
})