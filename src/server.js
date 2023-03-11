import express from "express";
import router from "./index.js";
import swaggerUi from 'swagger-ui-express'
import YAML from "yamljs";

const swaggerDocument = YAML.load('./swagger.yml');

const app = express();
const port = 3000;

app.use('/api-docs', 
swaggerUi.serve,
swaggerUi.setup(swaggerDocument))

app.use(express.json());
app.use(router)




app.listen(port, (error)=>{
    if(!error){
        console.log(`app running on localhost:${port}`)
    }else{
        console.log(error)
    }
})

export default app