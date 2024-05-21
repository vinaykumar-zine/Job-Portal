const User = require("../models/user");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const { use } = require("../routes/auth");

const registerUser = async(req, res) => {
    try{
        const {name, email, password, mobile} = req.body;
    if(!name || !email || !password || !mobile) {
        return res.status(400).send("please fill all the fields");
    }
    const isUserExist = (await User.findOne({email})) && (await User.findOne({mobile})); 
    if(isUserExist){
        return res.status(400).send("User already exist");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
        name, 
        email, 
        password: hashPassword,
        mobile,
    });
    await newUser.save();
    res.status(201).send("User registered successfully");
    }catch{
        next(err);
    }
    
};

const loginUser = async (req, res) => {
    try{
        const { email, password } = req.body;
        if( !email || !password){
            return res.status(400).send("please fill all the fields");
        }
        const user = await User.findone({email});
        if(!user){
            return res.status(400).send("Invalid password or email");
        }
        const isPasswordValied = await bcrypt.compare(poassword, user.password);
        if( !isPasswordValied) {
            return res.status(400).send("Invalid password or email");
        }
        const token = jwt.sign({userId: user._id}, "secret", {expiresIn: "240h"});
        res.status(200).send({token, userId: user._id, email: user.email, password: user.password, mobile: user.mobile});
        
    }catch{
        next(err);
    }
};

const allUser = async (req, res) => {
    const {email, password } = req.body;

    if(email === "admin@gmail.com" && password === "admin"){
        const users = await User.find();
        return res.status(200).json(users);
    }
    else{
        return res.status(404).send("invalid credential");
    }
}

module.exports = { registerUser, loginUser, allUser};
