require("dotenv").config();
let express =require('express'),
app = express(),
path= require('path');
app.use(express.static(path.join(__dirname)));
app.get('/', (req,res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get('/index',(req,res) =>{
    res.sendFile(__dirname + "/index.html");
})

app.get('/about',(req,res) =>{
    res.sendFile(__dirname + "/about.html")
})

app.listen(process.env.PORT,() => console.log(`Server is running ${process.env.PORT}`));