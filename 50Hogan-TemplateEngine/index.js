require("dotenv").config();
let bodyparser =require('body-parser');
let express = require('express'),
app = express(),
path =require('path'),
hogan =require('hogan-express');

// homga-engine
app.engine('html',hogan);
app.set('view engine','html');
// urlencoded
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.get('/api/user/:name',(req,res) =>{
  let name =req.params.name;
  res.send(`Params is ${name}`)
})

app.post('/api/login' ,(req,res) =>{
    let email =req.body.email;
    let password =req.body.password;
    res.send(`Params is Email ${email} and Password ${password}`)
});

// middlewar
app.use(express.static(path.join(__dirname)))
app.get('/',(req,res) =>{
    res.render('index');
})
app.get('/index',(req,res) =>{
    res.render('index');
})

app.get('/about',(req,res) =>{
    res.render('about')
})

app.listen(process.env.PORT,() => console.log(`Server is Running ${process.env.PORT}`));

