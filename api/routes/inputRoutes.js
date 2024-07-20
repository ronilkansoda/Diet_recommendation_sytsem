var express = require("express");
var { inputVal, getDietVal,getRandomData,getPersonalised,updatePersonalised } = require("../controller/inputControllers");

const router = express.Router()

router.post('/inputVal', inputVal)
router.get('/getDietVal/:id', getDietVal)
router.get('/getRandomData',getRandomData)
router.get('/getPersonalised/:id',getPersonalised)
router.post('/updatePersonalised/',updatePersonalised)

module.exports = router