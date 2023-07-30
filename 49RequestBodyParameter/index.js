
require("dotenv").config();
let bodyParser = require("body-parser");
let express = require('express'),
app = express(),
path = require('path');
port =process.env.PORT 

app.use(express.json());
app.use(express.urlencoded({extended:true}))

 app.get('/api/post/:name',(req,res) =>{
    let name = req.params.name;
    res.send(`Parmas name is ${name}`)
 })

 app.post('/api/login',(req,res) =>{
    let email =req.body.email;
    let password =req.body.password;
    res.send(`Params is email  ${email} and Password ${password}`)

 })

 app.listen(port,() => console.log(`Server is running ${port}`))