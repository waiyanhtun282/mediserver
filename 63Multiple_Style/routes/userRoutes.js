module.exports=(express) =>{
  let route =express.Router();
  route.get('/home',(req,res) =>{
    res.send({data:"User Home Route"})
  });
  route.get('/about',(req,res) =>{
    res.send({data:"User about Route"})
  });
  return route;
}