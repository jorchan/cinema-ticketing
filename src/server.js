import express from "express";
import router from "./index.js";
import swaggerUi from 'swagger-ui-express'
import YAML from "yamljs";

const swaggerDocument = YAML.load('./swagger.yaml');

const app = express();
const port = 3000;

app.use(express.json());
app.use(router)

app.use('/api-docs', 
swaggerUi.serve,
swaggerUi.setup(swaggerDocument))


app.listen(port, (error)=>{
    if(!error){
        console.log(`app running on ${port}`)
    }else{
        console.log(error)
    }
})

export default app