const { login, signup, getUsers } = require('../controllers/userController')

const router = require("express").Router()

router.post("/signup", signup);
router.post("/login", login);
router.get("/allusers/:id", getUsers);
//router.get("/logout/:id", logout);

module.exports = router;