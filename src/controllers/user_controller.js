const {UserModel} = require('../models');

const UserController = {
    createUser: async function (req, res) {
        try {
            const userData = req.body;
            const newUser = new UserModel(userData);
            await newUser.save();
            return res.json({ status: true, data: newUser, message: "User created" });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchAllUser: async function (req, res) {
        try {
            const users = await UserModel.find();
            return res.json({ status: true, data: users });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    fetchOneUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const user = await UserModel.findById(userId);
            return res.json({ status: true, data: user });
        } catch (e) {
            return res.json({ status: false, message: e });
        }
    },
    updateUser: async function (req, res) {
        try {
            const userId = req.params.id;
            const userData = req.body;
            await UserModel.findByIdAndUpdate(userId, userData);
            return res.json({ status: true, message: "User updated" });
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