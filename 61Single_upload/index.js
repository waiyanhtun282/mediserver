const express = require("express");
const app =express();
const multer = require("multer");
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
   cb(nll,'/assets/uploads');
  },
  filename: function (req, file, cb) {
   cb(null, file.originalname)
  }
});
let upload =multer({storage:storage});
app.post('/upload',upload.single('image'),(req,res,next) =>{
    console.log(req.file.filename);
    res.send(req.file.filename);
   
})

app.listen(3005,() => console.log("Server is port 3005 is running") );
