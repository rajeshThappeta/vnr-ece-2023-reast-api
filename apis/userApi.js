//create mini-express app
const exp = require("express");
const userApp = exp.Router();

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
userApp.post("/user", (req, res) => {
 
});

//route to update  a user by id
userApp.put("/user/:id", (req, res) => {
 
});

//route to delete a user by id
userApp.delete("/user/:id", (req, res) => {

});



//export userApp
module.exports=userApp;