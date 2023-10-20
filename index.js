import express  from "express";
import bodyParser from "body-parser"
import userRoutes from "./routes/users.js"

const app=express();
const PORT=3000;

app.use(bodyParser.json());
app.use('/users',userRoutes);

app.get('/',(req,res)=>{
    res.send('<h1>Welocme to home page</h1>')
})

app.listen(PORT, ()=>{
    console.log(`Sever is now listening at port ${PORT}`);
})
