const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

const getUser = async(req, res) => {

    const users = await User.find();
    
    res.json({
        ok: true,
        users
        // userAuth
    });
}

const postUser = async(req, res) => {

    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });
    
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );
    
    await user.save();

    res.json({
        ok: true,
        user
    });
}

module.exports = {
    getUser,
    postUser
}
