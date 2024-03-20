const mongoose= require('mongoose');
const Joi= require("joi");
const Joipassword = require("joi-password-complexity");
const jwt = require('jsonwebtoken')
const config = require('config')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email: {
        type: String,
        unique: true,
        required: true,
        maxlength:255,
    },
    password:{
        type: String,
        minlength: 8,
        required: true,
        maxlength:255
    },
    isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'))
    return token;
}

const User = new mongoose.model('User',userSchema);

function validateUser (user) {
    const schema = Joi.object({
        name: Joi.string(),
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required()
    })
    return schema.validate(user)
}

// function validatePswd(user) {
//     const schema = Joipassword.object({
//         password: Joipassword.min(8).lowerCase(1).numeric(1)
//     })
//     return schema.validate(user)
// }
exports.User = User,
exports.validate = validateUser
//exports.validatePswd = validatePswd