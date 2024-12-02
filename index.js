import express from 'express';
import cors from 'cors';
import bookRouter from './Routers/book.router.js'

const app=express();
const PORT=4000;
app.use(cors())
app.use(express.json());
// // app.get('/',(req,res)=>{
//     res.status(200).send("API is working")
// })
app.use('/api',bookRouter);





app.listen(PORT,()=>{
    console.log("APP is running the PORT",PORT)
})