//CREATE EXPRESS APP
const exp=require('express')
const app=exp();


//CREATE API (Routes)

//route to handle GET req 
app.get('/',(req,res)=>{
    //send res to client
    res.send("This res is from GET req handler")
})

//route to handle POST req
app.post('/',(req,res)=>{
    res.send('This res is from POST req handler')
})
//route to handle PUT req
app.put('/',(req,res)=>{
    res.send('This res is from PUT req handler')
})
//route to handle DELETE req
app.delete('/',(req,res)=>{
    res.send('This res is from DELETE req handler')
})


//assign port number to HTTP Server
app.listen(4000,()=>console.log("server listening on port 4000..."))