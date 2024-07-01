const User = require("../Models/User");
require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async(req, res) => {
  const token = req.cookies.token
  if (!token) {
    return res.json({ status: false })
  }
  try {
    const userData = jwt.verify(token, process.env.TOKEN_KEY);
    const user = await User.findById(userData.id);
  
    if (!user) {
      return res.json({ status: false });
    }
  
    const isAdmin = user.role === 'admin';
    req.isAdmin = isAdmin;
  
    return res.json({ status: true, user: user.username, role: user.role, isAdmin });
  } catch (err) {
    console.error("Error verifying token:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

