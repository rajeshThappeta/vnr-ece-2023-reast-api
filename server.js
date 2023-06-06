//CREATE EXPRESS APP
const exp=require('express')
const app=exp();

const userApp=require("./apis/userApi")
const productApp=require('./apis/productApi')

//if path starts with /user-api, then forward req to userApi
app.use('/user-api',userApp)
//if path starts with /product-api, then forward req to productApi
app.use('/product-api',productApp)

//assign port number to HTTP Server
app.listen(4000,()=>console.log("server listening on port 4000..."))