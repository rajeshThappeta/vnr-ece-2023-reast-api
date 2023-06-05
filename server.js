//CREATE EXPRESS APP
const exp=require('express')
const app=exp();


//local DATA
let usersList=[];

//CREATE  USER API (Routes)

//route to read all users
app.get('/users',(req,res)=>{
    res.send({message:"all users",payload:usersList})
})

//route to read one user by id
app.get('/users/:id',(req,res)=>{

    //get ID from url parameter
    let id=(+req.params.id);
    //find user by id
    let user=usersList.find(user=>user.id===id)
    if(user===undefined){
        res.send({message:'User not existed'})
    }else{
        res.send({message:"User found",payload:user})
    }
})

//body parser middleware
app.use(exp.json())

//route to create new user
app.post('/user',(req,res)=>{

    //get user obj from req
    let user=req.body;
    //add user to usersList
    usersList.push(user)
    //send res
    res.send({message:"User created"})
})

//route to update  a user by id
app.put('/user/:id',(req,res)=>{

    //get id from url
    let id=(+req.params.id)
    //get index of the user to update
    let indexOfUser=usersList.findIndex(user=>user.id===id)
    //if user not existed
    if(indexOfUser===-1){
        res.send({message:"User not found to modify"})
    }
    else{
    //get the modified user from client
        let modifiedUser=req.body;
    //replace old user with new user
        usersList.splice(indexOfUser,1,modifiedUser)
    //send res
        res.send({message:"User modified"})
    }
   

})

//route to delete a user by id
app.delete('/user/:id',(req,res)=>{
    //get id from url
    let id=(+req.params.id);
    //find index
    let indexOfUser=usersList.findIndex(user=>user.id===id)
    //if user not found
    if(indexOfUser===-1){
        res.send({message:"User not found to delete"})
    }
    else{
        usersList.splice(indexOfUser,1)
        res.send({message:"User deleted"})
    }
})

//assign port number to HTTP Server
app.listen(4000,()=>console.log("server listening on port 4000..."))