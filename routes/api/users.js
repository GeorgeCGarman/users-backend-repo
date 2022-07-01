const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const verifyJWT = require('../../middleware/verifyJWT')

router.route("/")
  .get(verifyJWT, usersController.getAllUsers)
  .post(usersController.handleNewUser)
  .put(usersController.updateUser)
  .delete(usersController.deleteUser)

router.route('/:id')
  .get(usersController.getUser)

module.exports = router