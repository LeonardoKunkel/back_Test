const jwt = require('jsonwebtoken')

const generateJWT = ( role = '' ) => {

    return new Promise( (resolve, reject) => {
    
        const payload = { role }; 
        
        jwt.sign( payload, process.env.SECRETOPRIVATEKEY, {
            expiresIn: '4h',
        }, ( err, token ) => {
        
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            } else {
                resolve( token );
            }
        
        });
    
    })

}

module.exports = {
    generateJWT
}
