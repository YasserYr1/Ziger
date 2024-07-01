const User = require("../Models/User.js");
const { createSecretToken } = require("../Util/SecretToken.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

module.exports.Signup = async (req, res, next) => {
  try {
    const { email, password, username, deliveryAddress, createdAt } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" });
    }
    const user = await User.create({ email, password, username, deliveryAddress, createdAt });
    const token = createSecretToken(user._id); 
    res.cookie("token", token, {
      withCredentials: true,
      httpOnly: false,
    });
    res 
      .status(201)
      .json({ message: "User signed in successfully", success: true, user });
    next();
  } catch (error) {
    console.error(error);
  }
};
 
module.exports.Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if(!email || !password ){
      return res.json({message:'All fields are required'})
    }
    const user = await User.findOne({ email });
    if(!user){
      return res.json({message:'Incorrect password or email' }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.json({message:'Incorrect password or email' }) 
    }
     const token = createSecretToken(user._id);
     res.cookie("token", token, {
       withCredentials: true,
       httpOnly: false,
     });
     res.status(201).json({ message: "User logged in successfully", success: true, role: user.role, username: user.username, email: user.email });
     next()
  } catch (error) {
    console.error(error);
  }
}

module.exports.Profile = async (req, res) => { 
  const { token } = req.cookies;
  if (!token) {
    return res.json(null);
  }
  jwt.verify(token, process.env.TOKEN_KEY, {}, async (err, userData) => {
    if (err) {
      console.error(err);
      return res.status(401).json({ message: "Unauthorizedd" });
    }
    try {
      const { username, email, _id, role } = await User.findById(userData.id);
      res.json({ username, email, _id, role, token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
};

module.exports.Logout = (req, res) => {
  res.cookie("token", "").json(true);
};