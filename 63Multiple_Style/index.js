require("dotenv").config();
let express =require("express");
let app =express();
let multer=require("multer");
let guestRoute =require('./routes/guestRoutes')(express);
let userRoute  = require('./routes/userRoutes')(express);
app.use('/',guestRoute);
app.use('/user',userRoute);
app.listen(3002,() => console.log(`Server is running ;${process.env.PORT}`));