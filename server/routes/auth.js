const express = require("express");
const router = express.Router();
const { registerUser, loginUser, allUsers } = require("../controllers/user");
router.get("/", (req, res) => {
  res.status(200).send("Auth Route!");
});

//take the email, name, password and mob no. from the request body
//check the user already exist or not
//hash the password using bcrypt 
//save the user to the databse 

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/all", allUsers);
module.exports = router;

