var express = require("express");
var { signIn, signUp } = require("../controller/authControllers");

const router = express.Router()

router.post('/signUp', signUp)
router.post('/signIn', signIn)
// router.post('/google', google)

module.exports = router