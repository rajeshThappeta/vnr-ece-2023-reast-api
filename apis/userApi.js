//create mini-express app
const exp = require("express");
const userApp = exp.Router();

//body parser middleware
userApp.use(exp.json());

//local DATA
let usersList = [];

//CREATE  USER API (Routes)

//route to read all users
userApp.get("/users", (req, res) => {
  res.send({ message: "all users", payload: usersList });
});

//route to read one user by id
userApp.get("/users/:id", (req, res) => {
  //get ID from url parameter
  let id = +req.params.id;
  //find user by id
  let user = usersList.find((user) => user.id === id);
  if (user === undefined) {
    res.send({ message: "User not existed" });
  } else {
    res.send({ message: "User found", payload: user });
  }
});

//route to create new user
userApp.post("/user", (req, res) => {
  //get user obj from req
  let user = req.body;
  //add user to usersList
  usersList.push(user);
  //send res
  res.send({ message: "User created" });
});

//route to update  a user by id
userApp.put("/user/:id", (req, res) => {
  //get id from url
  let id = +req.params.id;
  //get index of the user to update
  let indexOfUser = usersList.findIndex((user) => user.id === id);
  //if user not existed
  if (indexOfUser === -1) {
    res.send({ message: "User not found to modify" });
  } else {
    //get the modified user from client
    let modifiedUser = req.body;
    //replace old user with new user
    usersList.splice(indexOfUser, 1, modifiedUser);
    //send res
    res.send({ message: "User modified" });
  }
});

//route to delete a user by id
userApp.delete("/user/:id", (req, res) => {
  //get id from url
  let id = +req.params.id;
  //find index
  let indexOfUser = usersList.findIndex((user) => user.id === id);
  //if user not found
  if (indexOfUser === -1) {
    res.send({ message: "User not found to delete" });
  } else {
    usersList.splice(indexOfUser, 1);
    res.send({ message: "User deleted" });
  }
});



//export userApp
module.exports=userApp;