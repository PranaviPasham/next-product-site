const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const Joi = require('joi');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const {User} = require('../models/users');

router.post('/',async(req,res)=> {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid email or password');

    let validPassword = await bcrypt.compare(req.body.password,user.password)
    if(!validPassword) return res.status(400).send('Invalid email or password')

    const token = user.generateAuthToken();
    res.send(token)
})

function validate(req) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    })
    return schema.validate(req)
}

module.exports = router;