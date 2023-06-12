//create mini-express app
const exp = require("express");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");

//body parser middleware
userApp.use(exp.json());

//CREATE  USER API (Routes)

//route to read all users
userApp.get("/users", async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get users
  let users = await usersCollectionObj.find({status:true}).toArray();
  //send res
  res.send({ message: "all users", payload: users });
});

//route to read one user by username
userApp.get("/users/:username", async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;
  //find user by username
  let user = await usersCollectionObj.findOne({ username: usernameOfUrl,status:true });
  //send res
  res.send({ message: "one user", payload: user });
});

//route to create new user
userApp.post("/user", async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get new user from req
  let newUser = req.body;
  //verify user's existance
  let existingUser = await usersCollectionObj.findOne({
    username: newUser.username,
  });
  //if user not existed
  if (existingUser === null) {
    //add status property to new user
    newUser.status=true;
    //hash the password
    let hashedPassword = await bcryptjs.hash(newUser.password, 5);
    //replace plain paassword with hashed password
    newUser.password = hashedPassword;
    //create new user
    await usersCollectionObj.insertOne(newUser);
    res.send({ message: "User creation success" });
  } else {
    res.send({ message: "User already existed" });
  }
});

//route to update  a user by usernme
userApp.put("/user/:username", async (req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;
  //get modified user from client
  let modifiedUser = req.body;
  //update
  await usersCollectionObj.updateOne(
    { username: usernameOfUrl },
    {
      $set: {
        ...modifiedUser,
      },
    }
  );
  //send res
  res.send({message:"User update success"})
});

//route to delete a user by username
userApp.delete("/user/:username", async(req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;

  //soft delete
  await usersCollectionObj.updateOne({username:usernameOfUrl},{$set:{status:false}})
  //send res
  res.send({message:"User deleted"})

});

//route to delete a user by username
userApp.get("/restore-user/:username", async(req, res) => {
  //get usersCollectionObj
  let usersCollectionObj = req.app.get("usersCollectionObj");
  //get username from url
  let usernameOfUrl = req.params.username;

  //soft delete
  await usersCollectionObj.updateOne({username:usernameOfUrl},{$set:{status:true}})
  //send res
  res.send({message:"User restored"})

});





userApp.post("/write-review", (req, res) => {});

userApp.post("/buy-product", (req, res) => {});
userApp.post("/add-to-cart", (req, res) => {});

//export userApp
module.exports = userApp;
