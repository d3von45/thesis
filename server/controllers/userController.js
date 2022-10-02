const bcrypt = require('bcryptjs');
const User = require('../models/User');
const google = require("googleapis");
const { OAuth2 } = google.Auth;
const { base64ToBuffer, bufferToBase64 } = require('../helpers/utils');

const { readFileSync } = require('fs');

const createToken = require("../helpers/createToken");
const sendMail = require('../helpers/sendMail');
const jwt = require('jsonwebtoken');

const userController = {
    register: async (req, res) => {
        try {
            const { fullname, password, email } = req.body;

            if (!fullname || !password || !email) return res.status(400).json({ msg: "Please fill in all fields" });

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (user) return res.status(400).json({ msg: "This email already used!" });

            if (password.length < 6) return res.status(400).json({ msg: "Password must be at least 6 characters" });

            const salt = await bcrypt.genSalt();

            const hashPassword = await bcrypt.hash(password, salt);
            const newUser = { fullname, email, password: hashPassword };
            const activation_token = createToken.activation(newUser);

            const url = `http://localhost:3000/api/auth/activate/${activation_token}`;

            await sendMail.sendEmailRegister(email, url, "Verify your email");
            res.status(200).json({ msg: "welcom!, Please check your email." })
        } catch (err) {
            res.status(500).json({ msg: err.message, check: "asdas" });
        }
    },

    activate: async (req, res) => {
        try {

            const { activation_token } = req.body;
            const user = jwt.verify(activation_token, process.env.ACTIVATION_TOKEN);
            const { fullname, email, password, phone } = user;
            const newUser = await User.create({
                fullname: fullname,
                email: email,
                password: password,
                phone: phone
            });
            res.status(201).send(newUser);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    signin: async (req, res) => {
        try {

            const { email, password } = req.body;

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) return res.status(400).json({ msg: "This email is not registered" });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return res.status(400).json({ msg: "Password is incorrect" });

            const token = createToken.access({ id: user.id });

            res.status(200).json({ msg: "Signing success", token: token });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    forgot: async (req, res) => {
        try {

            const { email } = req.body;

            const user = await User.findOne({
                where: {
                    email: email
                }
            });

            if (!user) return res.status(400).json({ msg: "This is email is not registered in our system" });

            const token = createToken.access({ id: user.id });

            const url = `http://localhost:3000/auth/reset-password/${token}`;
            const name = user.fullname;
            sendMail.sendEmailReset(email, url, "Reset your password", name);
            res.status(500).json({ msg: "Re-send the password, please check your email" });
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    reset: async (req, res) => {
        try {

            const { password } = req.body;

            const salt = await bcrypt.genSalt();

            const hashPassword = await bcrypt.hash(password, salt);

            await User.update({ password: hashPassword }, {
                where: {
                    id: req.user.id
                }
            });

            res.status(200).json({ msg: "Password was updated successfully." });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    changePassword: async (req, res) => {
        try {

            console.log(req.cookie);
            id = req.user.id;
            const { old_password, new_password } = req.body;

            if (new_password.length < 6) return res.status(400).json({ msg: "password >= 6 ki tu" });

            const user = await User.findByPk(id);
            const isMatch = await bcrypt.compare(old_password, user.password);

            if (!isMatch) return res.status(400).json({ msg: "password incorrect" });

            const salt = await bcrypt.genSalt();
            const hashPassword = await bcrypt.hash(new_password, salt);
            User.update({ password: hashPassword }, { where: { id: id } });

            res.status(200).json({ msg: "password updated" });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    signout: async (req, res) => {
        try {

            res.clearCookie("_apprftoken", { path: "/api/auth/access" });
            res.status(200).json({ msg: "Signout success" });

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    google: async (req, res) => {
        try {

            const { tokenId } = req.body

            const client = new OAuth2(process.env.G_CLIENT_ID);
            const verify = await client.verifyIdToken({
                idToken: tokenId,
                audience: process.env.G_CLIENT_ID
            });

            const { email_verified, email, name, picture } = verify.payload;

            if (!email_verified) return res.status(400).json({ msg: "Email verification failed" });

            const user = await User.findOne({ where: { email: email } });

            if (user) {
                const rf_token = createToken.refresh({ id: user.id });
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.status(200).json({ msg: "signin with google success" });
            } else {
                const password = email + process.env.G_CLIENT_ID;
                const salt = await bcrypt.genSalt();
                const hashPassword = await bcrypt.hash(password);

                const newUser = await User.create({
                    fullname: name,
                    email: email,
                    password: hashPassword
                });
                const rf_token = createToken.refresh({ id: user.id });
                res.cookie("_apprftoken", rf_token, {
                    httpOnly: true,
                    path: "/api/auth/access",
                    maxAge: 24 * 60 * 60 * 1000
                });
                res.status(200).json({ msg: "signin with google success" });
            }

        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    },

    getUser: async (req, res) => {
        const user = await User.findOne({
            where: { id: req.params.id }
        });

        const data = readFileSync('test.jpg');
        console.log(data);

        const base64_data = bufferToBase64(user.avatar);
        const buffer_data = base64ToBuffer(base64_data);
        console.log(buffer_data);

        // await User.create({avatar: data});



        res.send(`<img src="data:image/jpeg;base64,${base64_data}">`);
        // res.json("ok");

    },
    updateUser: async (req, res) => {
        const data = req.body;
        const { id } = req.user;

        try {
            const user = await User.update(data, { where: { id: id } });
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json({ msg: err.message });
        }
    }

}


module.exports = userController;