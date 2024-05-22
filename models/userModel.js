const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const validator = require('validator');
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    phone: {
        type: 'String',
        required: true,
        unique: true,
        validate: {
            validator: (value) => {
                if (value === "") {
                    return true;
                }
                return validator.isMobilePhone(value);
            },
            message: "{VALUE} is not valid"
        }
    },
    password: String,
    role: {
        type: String,
        enum: ['ADMIN', 'CLIENT', 'AGENT'],
        required: true
    },
    status: {
        type: String,
        enum: ['ACTIVE', 'DELETED']
    }
}, { timestamps: true })

userSchema.pre('save', async function (next) {
    const user = this;
    let isUserExists = await UserModel.findOne({
        $or: [
            { phone: user.phone }
        ]
    })
    if (isUserExists) {
        throw 'user already exists'
    }
    if (!user.isModified('password')) return next();
    console.log('just before saving...');
    user.password = await bcrypt.hash(user.password, saltRounds);
    console.log('just before saving...');
    return next();
});
const UserModel = mongoose.model('user', userSchema)
module.exports = { UserModel }

