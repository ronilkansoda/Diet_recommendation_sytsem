var express = require('express')
const { getUsers, getUsersById, addUser, updateUser, removeUser } = require('../controller/userController')

const router = express.Router()

router.get('/users',getUsers)
router.get('/users/:id',getUsersById)
router.get('/users/remove/:id',removeUser)
router.post('/users/add',addUser)
router.post('/users/up/:id',updateUser)

module.exports = router