const express = require('express')
const router = express.Router()
const usersController = require('../../controllers/usersController')
const verifyJWT = require('../../middleware/verifyJWT')
const verifyRole = require('../../middleware/verifyRole')


router.route("/")
  .get(verifyJWT, usersController.getAllUsers)
  .post(verifyRole('admin', 'mod'), usersController.handleNewUser)
  .put(verifyRole('admin', 'mod'), usersController.updateUser)
  .delete(verifyRole('admin'), usersController.deleteUser)

router.route('/:id')
  .get(usersController.getUser)

module.exports = router