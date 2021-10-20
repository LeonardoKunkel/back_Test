const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

const verifyAdmin = async(req, res, next) => {

    const token = req.header('Authorization');
    
    if( !token ) {
        return res.status(401).json({
            msg: 'There is no token in the request'
        });
    }
    
    try {
        
        const payload = jwt.verify( token, process.env.SECRETOPRIVATEKEY );
        
        if( payload.uid !== 'ADMIN_ROLE') {
            return res.status(401).json({
                msg: 'You are not admin'
            });
        }
        
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Unauthorized'
        })
    }
    
    
}

module.exports = {
    verifyAdmin
}
