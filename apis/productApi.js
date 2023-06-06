//create mini-express app
const exp=require('express');
const productApp=exp.Router();


//products API routes
productApp.get('/product',(req,res)=>{
    res.send({message:"It is a product"})
})



//export productApp
module.exports=productApp;