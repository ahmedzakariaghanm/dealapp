const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tokenSecret = "config.dotEnv.TOKEN_SECRET"
const { UserModel } = require("../models/userModel")
const signup = async (req, res) => {
    try {
        let user = req.body
        user.status = "ACTIVE"
        let userCreated = await UserModel(user).save()
        let token = generateToken({ userId: userCreated._id, role: user.role });
        res.setHeader('token', token);
        res.status(201).json({
            user: {
                phone: user.phone,
                username: user.username,
                role: user.role,
            }
        })

    } catch (e) {
        res.status(400).json({ "message": String(e) })
    }
}
const login = async (req, res) => {
    try {
        const user = req.body;
        let createdUser = await UserModel.findOne({ phone: user.phone });
        if (!createdUser) {
            throw "Invalid phone or password"
        }
        let isValidPassword = await bcrypt.compare(user.password, createdUser.password)
        if (!isValidPassword) {
            throw "Invalid phone or password"
        }
        let token = generateToken({ userId: createdUser._id, role: createdUser.role });
        console.log("token :", token)
        res.setHeader('token', token);
        res.status(200).json({
            user: {
                phone: createdUser.phone,
                username: createdUser.username,
                role: createdUser.role
            }
        })

    } catch (e) {
        console.log(e.Error)
        res.status(400).json({ "message": String(e) })
    }
}

const generateToken = ({ userId, role }) => {
    return jwt.sign(
        {
            userId,
            role,
        },
        tokenSecret,
        {
            expiresIn: '10m'
        })
}

const verifyToken = ({ token }) => {
    let decoded = null;
    try {
        decoded = jwt.verify(token, tokenSecret);
    } catch (err) { console.log(err); }
    return decoded;
}
module.exports = {
    signup,
    login,
    verifyToken,
}