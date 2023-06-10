//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs=require("bcryptjs")

//body parser middleware
userApp.use(exp.json());



//CREATE  USER API (Routes)

//route to read all users
userApp.get("/users", (req, res) => {
 
});

//route to read one user by id
userApp.get("/users/:id", (req, res) => {
 
});

//route to create new user
userApp.post("/user", async(req, res) => {
 
  //get usersCollectionObj
  let usersCollectionObj=req.app.get('usersCollectionObj')
  //get new user from req
  let newUser=req.body;
  //verify user's existance
  let existingUser=await usersCollectionObj.findOne({username:newUser.username})
  //if user not existed
  if(existingUser===null){
    //hash the password
    let hashedPassword=await bcryptjs.hash(newUser.password,5)
    //replace plain paassword with hashed password
    newUser.password=hashedPassword;
    //create new user
    await usersCollectionObj.insertOne(newUser)
    res.send({message:"User creation success"})
  }
  else{
    res.send({message:'User already existed'})
  }
});





//route to update  a user by id
userApp.put("/user/:id", (req, res) => {
 
});

//route to delete a user by id
userApp.delete("/user/:id", (req, res) => {

});



userApp.post('/write-review',(req,res)=>{

})

userApp.post('/buy-product',(req,res)=>{
  
})
userApp.post('/add-to-cart',(req,res)=>{
  
})

//export userApp
module.exports=userApp;