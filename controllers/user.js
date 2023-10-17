const User = require('../models/user')

const addUser = async (req, res, next) => {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const phonenumber = req.body.phonenumber;
  
      const data = await User.create({
        name: name,
        email: email,
        phonenumber: phonenumber,
      });
      res.status(201).json({ newUserDetail: data });
    } catch (err) {
      res.status(500).json({
        error: err,
      });
    }
  };

  const getUser = async (req, res, next) => {
    try {
      const users = await User.findAll();
      res.status(200).json({allUsers: users});
    }
      catch (err) {
        console.log('Get user is failing', JSON.stringify(err));
        res.status(500).json({
          error: err,
        })
      }
  };

  const deleteUser = async (req, res, next) => {
    try {
      const userId = req.params.userId;
      const user = await User.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      await user.destroy();
  
      res.status(204).end(); // Successful delete (no content)
    } catch (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: err });
    }
  };

  module.exports = {
    addUser,
    getUser,
    deleteUser
  }
  