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
                mobileno: phone, // Ensure this matches the schema field name
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
            res.status(401).send({ message: 'UnAuthorized', data: [] });

        }
    }
    async UpdateProfile(req, res) {
        const Obj = req.body;
        const validateuser = await UserServices.CheckUserById(Obj?.id);
        if (validateuser) {
            const updateuser = await UserServices.UpdateUser({
                id: Obj?.id,
                updateobj: Obj?.data
            });
            if (updateuser) {
                res.status(200).send({ message: 'User Updated Successfully', data: updateuser });
            }
            else {
                res.status(401).send({ message: 'User Updation Failed', data: [] });
            }

        }
        else {
            res.status(401).send({ message: 'UnAuthorized', data: [] });

        }
    }
    async GetProfileByID(req, res) {
        const Obj = req.query;
        const validateuser = await UserServices.CheckUserById(Obj?.id);
        if (validateuser) {
            res.status(200).send({ message: 'Success', data: validateuser });
        }
        else {
            res.status(401).send({ message: 'UnAuthorized', data: [] });

        }
    }

}

const userController = new UserController();
module.exports = userController;