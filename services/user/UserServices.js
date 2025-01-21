const User = require("../../models/schema");

class UserService {


  async CreateUser(userData) {
    try {
      const newUser = new User(userData);
      const savedUser = await newUser.save();
      return savedUser;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }

  }
  async GetUser() {
    try {
      const users = await User.find();
      return users;
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  }
  async GetUserById(id) {
    try {
        const users = await User.find();
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
      }
    }
    async UpdateUserById(id, userData) {
      try {
        const updatedUser = await User.findByIdAndUpdate(id, userData, { new: true });
        return updatedUser;
      }
        catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    }
    async DeleteUserById(id) {
        try {
            await User.findByIdAndDelete(id);
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    }
  
}

module.exports = new UserService();