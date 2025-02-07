const User = require('../../models/schema');
const UserServices = require('../../services/UserServices');

class UserController {
    async RegisterUser(req, res) {
        console.log("Incoming request body:", req.body);

        const { name, email, phone } = req.body;
        console.log("Extracted phone number:", phone);

        if (!name || !email || !phone) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        try {
            const checkuser = await UserServices.CheckUser(phone);
            if (checkuser) {
                return res.status(409).json({ message: 'User Already Exists. Please Login' });
            }

            const createuser = await UserServices.CreateUser({
                name,
                email,
                mobileno: phone,
                otp: Math.floor(100000 + Math.random() * 900000).toString()
            });

            res.status(201).json({ message: 'User Created successfully', data: createuser });
        } catch (error) {
            console.error('Error creating user:', error);
            res.status(500).json({ message: 'Internal Server Error', error: error.message });
        }
    }

    async CheckUser(req, res) {
        console.log("Incoming request body:", req.body);

        const { phone } = req.body;

        const validateuser = await UserServices.CheckUser(phone);
        if (validateuser) {
            res.status(200).send({ message: 'User Exists', data: validateuser });
        }
        else {
            res.status(401).send({ message: 'User Not Found', data: [] });

        }
    }

    async VerifyOTP(req, res) {
        const Obj = req.body;
        const validateuser = await UserServices.ValidateUserOTP(Obj.mobileno, Obj.otp);
        if (validateuser) {
            res.status(200).send({ message: 'User Validated Successfully', data: validateuser });
        }
        else {
            res.status(401).send({ message: 'Incorrect OTP', data: [] });

        }
    }

    async UpdateProfile(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { name, bio, email, mobileno } = req.body;

            const validateuser = await UserServices.CheckUser(mobileno);
            if (!validateuser) {
                return res.status(401).json({
                    message: 'UnAuthorized',
                    data: []
                });
            }

            const updateuser = await UserServices.UpdateUser({
                mobileno,
                updateobj: {
                    name,
                    bio,
                    email
                }
            });

            if (updateuser) {
                return res.status(200).json({
                    message: 'User Updated Successfully',
                    data: updateuser
                });
            } else {
                return res.status(400).json({
                    message: 'User Update Failed',
                    data: []
                });
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            return res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

    async GetUser(req, res) {
        try {
            console.log("Incoming request body:", req.body);
            const { mobileno } = req.body;

            const validateuser = await UserServices.CheckUser(mobileno);
            if (validateuser) {
                const userData = {
                    name: validateuser.name,
                    profile: validateuser.profile,
                    email: validateuser.email,
                    mobileno: validateuser.mobileno,
                    bio: validateuser.bio,
                };
                res.status(200).json({
                    message: 'Success',
                    data: userData
                });
            } else {
                res.status(401).json({
                    message: 'UnAuthorized',
                    data: []
                });
            }
        } catch (error) {
            console.error('Error fetching user:', error);
            res.status(500).json({
                message: 'Internal Server Error',
                error: error.message
            });
        }
    }

}

const userController = new UserController();
module.exports = userController;