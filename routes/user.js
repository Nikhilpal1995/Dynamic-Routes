const express = require('express');

const router = express.Router();
const usercontroller = require('../controllers/user')

router.post("/add-user", usercontroller.addUser)
  
router.get("/get-user", usercontroller.getUser)
  
router.delete("/delete-user/:userId", usercontroller.deleteUser);

  module.exports = router;