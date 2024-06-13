const {UserModel} = require('../models');

const UserController = {
    createUser: async function (req, res) {
        try {
            const {name,email,countryCode,phoneNo,password,role,city,state,country,pincode,street} = req.body;
            const address = {city,state,country,pincode,street};
            const phone = {
                CountryCode: countryCode,number:phoneNo
            };

            // Check if the user already exists
            const newUser = new UserModel({name,email,phone,address,password,role});
            await newUser.save();
            return res.json({ status: true, data: newUser, message: "User created" });
        } catch (e) {
            return res.json({ status: false, message: e.message });
        }
    },
    fetchAllUser: async function (req, res) {
        try {
            const users = await UserModel.find();
            return res.json({ status: true, data: users, message: "Fetch all users"});
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchOneUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);
            return res.json({ status: true, data: user, message: "User Fetched"});
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    updateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const {name,phone,email,address} = req.body;
            const updatedUser = await UserModel.findByIdAndUpdate(userId, {name,phone,email,address}, {new: true});
            return res.json({ status: true, data: updatedUser, message: "User updated" });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    deleteUser: async function (req, res) {
        try {
            const userId = req.params.id;
            await UserModel.findByIdAndDelete(userId);
            return res.json({ status: true, message: "User deleted" });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
};

module.exports = UserController;