const User = require("../models/schema");

class UserService {

    async CheckUser(phone) {
        const user = await User.findOne({ mobileno: phone });
        return user;
    }

    async CheckUserById(id) {
        const user = await User.findOne({ _id: id });
        return user;
    }

    async ValidateUserOTP(mobileno, otp) {
        const user = await User.findOne({ mobileno: mobileno, otp: otp });
        return user;
    }

    async CreateUser(userData) {
        try {
            const existingUser = await User.findOne({ mobileno: userData.mobileno });
            if (existingUser) {
                throw new Error(`User with mobile number ${userData.mobileno} already exists.`);
            }
            // Create a new user
            const newUser = new User(userData);
            const savedUser = await newUser.save();
            return savedUser;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }

    async UpdateUser(userData) {
        try {
            const existingUser = await User.findById(userData.id);
            if (!existingUser) {
                throw new Error(`User with ID ${userData.id} not exists.`);
            }
            // Update the existing user with the provided update object
            const updatedUser = await User.findByIdAndUpdate(
                userData.id,
                userData.updateobj,
                { new: true }
            );

            if (!updatedUser) {
                throw new Error('Failed to update user. Please try again.');
            }

            return updatedUser;
        } catch (error) {
            console.error('Error updating user:', error.message);
            throw error; // Propagate the error for external handling
        }
    }
}

module.exports = new UserService();