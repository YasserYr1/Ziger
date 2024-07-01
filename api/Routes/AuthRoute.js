const { Signup, Login, Profile, Logout } = require("../Controllers/AuthController");
const { userVerification } = require("../Middlewares/AuthMiddleware");

const router = require("express").Router();

router.post("/signup", Signup);
router.post('/login', Login);
router.get('/profile', Profile);
router.post('/logout', Logout);
router.post('/',userVerification);

module.exports = router;