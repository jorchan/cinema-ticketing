import express from "express";
import router from './index.js'

const app = express();
const port = 3000;

app.use(express.json());
app.use(router)

app.listen(port, (error)=>{
    if(!error){
        console.log(`app running on ${port}`)
    }else{
        console.log(error)
    }
})