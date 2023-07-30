module.exports=(express) =>{
    let route =express.Router();

    route.get('/',(req,res) =>{
        res.send({data:"Guset Route Home"})
    });
    route.get('/about',(req,res) =>{
        res.send({data:"Guset Route About"})
    });

    return route;
}