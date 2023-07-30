require("dotenv").config();
const express =require('express');
const app = express();
const bodyParser=require("body-parser");
const jwt = require("jsonwebtoken");
// urleccode
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/login',(req,res) =>{
    let email =req.body.email;
    let password =req.body.password;
    //need payload
let payload ={email:email}
 let token =jwt.sign(payload,process.env.SECRET);

 res.json({token:token});
    
})

app.listen(process.env.PORT,() => console.log(`Server is running ${process.env.PORT}`))