const bcrypt = require('bcryptjs');

const User = require('../models/user.model');
const { generateJWT } = require('../helper/generateJWT');


const login = async (req, res) => {
    
    const { email, password } = req.body;
    
    try {
    
        const user = await User.findOne({ email });
        
        if ( !user ) {
            return res.status(400).json({
                msg: 'Email or password invalid'
            });
        }
        
        const validPassword = bcrypt.compareSync( password, user.password );
        if ( !validPassword ) {
            return res.status(400).json({
                msg: 'Email or password invalid'
            });
        }
    
        const token = await generateJWT( user.role );
    
        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: 'Internal Server Error'
        });
    }
        
    
}

module.exports = { login }
